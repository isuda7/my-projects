function createConsumeUri() {
    const originUrl = window.location.origin;
    const baseUrl = originUrl.includes('kooroo.co.kr') || originUrl.includes('lgensol.com')
        ? `${originUrl}${import.meta.env.VITE_CONSUME_SERVER_PATH}`
        : import.meta.env.VITE_CONSUME_SERVER_URL + import.meta.env.VITE_CONSUME_SERVER_PATH;
    return `${baseUrl}/events`;
}
function createConsumeUriStation(stationId: string) {
    return createConsumeUri() +`/${stationId}`;
}

function createConsumeUriIfNo(stationId: string, ifNo: string) {
    return createConsumeUriStation(stationId) +`/${ifNo}`;
}

function createWebsocketUri() {
    const originUrl = window.location.origin;
    const baseUrl = originUrl.includes('kooroo.co.kr') || originUrl.includes('lgensol.com')
        ? `${originUrl}${import.meta.env.VITE_WEBSOCKET_SERVER_PATH}`
        : import.meta.env.VITE_WEBSOCKET_SERVER_URL + import.meta.env.VITE_WEBSOCKET_SERVER_PATH;
    return `${baseUrl}`;
}
function createWebsocketUriStation(stationId: string) {
    return createWebsocketUri() +`/${stationId}`;
}

function createWebsocketUriIfNo(stationId: string, ifNo: string) {
    return createWebsocketUriStation(stationId) +`/interface-${ifNo}`;
}
export {
    createConsumeUri,
    createConsumeUriStation,
    createConsumeUriIfNo,
    createWebsocketUri,
    createWebsocketUriStation,
    createWebsocketUriIfNo
}