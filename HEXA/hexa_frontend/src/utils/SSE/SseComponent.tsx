import React, { useEffect, useState } from 'react';

const SseComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
	const eventSource = new EventSource('http://localhost:8080/events');

	eventSource.onmessage = (event) => {
	  console.log(event);
	  // const newMessage = JSON.parse(event.data).message;
	  const newMessage = event.data;
	  setMessages((prevMessages) => [...prevMessages, newMessage]);
	};

	return () => {
	  eventSource.close();
	};
  }, []);

  return (
	<div>
	  <ul>
		{messages.map((message, index) => (
		  <li key={index}>{message}</li>
		))}
	  </ul>
	</div>
  );
};

export default SseComponent;