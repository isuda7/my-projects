import SockJS from 'sockjs-client';  // 수정된 import
import { Client, IFrame, IMessage } from '@stomp/stompjs';
import store from "@/store";

interface MessageData {
    eventType: string;
    data: any;
}
type SseService = {
    execute: (json: any) => void;
};

class WebSocketMessageService {
    public stompClient: Client | null = null;
    private readonly serverUrl: string;
    private readonly reconnectInterval: number;
    private eventHandlers: Map<string, (data: any) => void>;
    private subscriptions: Map<string, { id: string }> = new Map();
    private serviceMap: Map<string, SseService>;
    private topic: string;

    constructor(url: string, serviceMap: Map<string, SseService>, topic: string, reconnectInterval: number = 1000) {
        // HTTP/HTTPS 기반 URL 사용
        this.serverUrl = url;
        this.reconnectInterval = reconnectInterval;
        this.eventHandlers = new Map();
        this.serviceMap = serviceMap;
        this.topic = topic;
        this.connect();
    }

    private connect(): void {
        const socket = new SockJS(this.serverUrl);
        this.stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: this.reconnectInterval,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            // forceBinaryWSFrames: true,
            // appendMissingNULLonIncoming: true,
            debug: (str) => {
                console.log('STOMP Debug:', str);
            }
        });

        this.stompClient.onConnect = () => {
            console.log('STOMP 연결됨');
            this.initEventHandlers();
            this.subscribeToTopic(this.topic);
            // this.subscribeToDefaultTopics();
        };

        this.stompClient.onDisconnect = () => {
            console.log('STOMP 연결 끊김');
        };

        this.stompClient.onStompError = (frame: IFrame) => {
            console.log('STOMP 오류:', frame);
        };


        try {
            this.stompClient.activate();
        } catch (error) {
            console.error('STOMP 연결 오류:', error);
        }
    }

    private initEventHandlers(): void {
        this.serviceMap.forEach((service, eventType) => {
            console.log('initEventHandlers', eventType)
            this.addEventHandler(eventType, (data) => {
                service.execute(data);
            });
        });
    }

    public subscribeToDefaultTopics(): void {
        if (this.stompClient?.connected) {
            this.subscribeToTopic('/topic/all');
        }
    }
    private handleMessage(message: IMessage): void {
        try {
            if (message.body) {
                const json = JSON.parse(message.body) as MessageData;
                const handler = this.eventHandlers.get(json.eventType);
                if (handler) {
                    handler(json);
                }
            }
        } catch (error) {
            console.error('메시지 처리 오류:', error);
        }
    }

    public subscribeToStation(stationId: string): void {
        if (this.stompClient?.connected && !this.subscriptions.has(`/topic/${stationId}`)) {
            const subscription = this.stompClient.subscribe(
                `/topic/${stationId}`,
                (message) => this.handleMessage(message)
            );
            this.subscriptions.set(`/topic/${stationId}`, subscription);
            console.log(`Subscribed to station: ${stationId}`);
        }
    }

    public unsubscribeFromStation(stationId: string): void {
        const subscription = this.subscriptions.get(`/topic/${stationId}`);
        if (subscription) {
            subscription.id && this.stompClient?.unsubscribe(subscription.id);
            this.subscriptions.delete(`/topic/${stationId}`);
            console.log(`Unsubscribed from station: ${stationId}`);
        }
    }

    public subscribeToTopic(topic: string): void {
        if (this.stompClient?.connected && !this.subscriptions.has(topic)) {
            const subscription = this.stompClient.subscribe(
                topic,
                (message) => {
                    try {
                        if (message.body) {
                            console.log('me', message.body)
                            const json = JSON.parse(message.body) as MessageData;
                            console.log('json.eventType',json.eventType)
                            const handler = this.eventHandlers.get(json.eventType);
                            if (handler) {
                                console.log('json.data', json)
                                handler(json);
                            }
                        }
                    } catch (error) {
                        console.error('메시지 처리 오류:', error);
                    }
                }
            );
            this.subscriptions.set(topic, subscription);
        }
    }



    public addEventHandler(eventType: string, handler: (data: any) => void): void {
        this.eventHandlers.set(eventType, handler);
    }

    public close(): void {
        if (this.stompClient) {
            this.stompClient.deactivate();
        }
    }

}

export default WebSocketMessageService;