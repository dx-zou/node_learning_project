const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3000;
const server = express().listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});

const wss = new SocketServer({ server });

wss.on('connection', ws => {
	console.log('connected start');
	// setInterval(() => {
	//   ws.send(String(new Date()));
	// }, 2000);
	ws.on('message', data => {
		let clients = wss.clients;
		console.log(clients);
		clients.forEach(client => {
			client.send(data);
		});
	});
	ws.on('close', () => {
		console.log('connected close');
	});
});
