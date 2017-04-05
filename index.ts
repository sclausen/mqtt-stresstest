import * as mqtt from 'mqtt';

const uuid = function (): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

let clients = [];
for (let i = 0; i < 10000; i++) {
  const clientId = uuid();
  // console.log(`${i} create client for ${clientId}`);
  const options = {
    username: 'mqtt-default',
    // password: 'wrong_password',
    password: '1234567890',
    clientId: clientId,
    clean: true
  };
  let client = mqtt.connect('mqtt://192.168.0.108:1883', options);
  // let client = mqtt.connect('mqtt://localhost:1883', options);
  client.on('connect', () => {
    console.log(`CONNECTED - ${Date.now()} ${clientId}`);
  });
  client.on('error', (e) => {
    console.log(`ERROR     - ${Date.now()} ${clientId}`, e);
  });
  client.on('close', (e) => {
    console.log(`CLOSE     - ${Date.now()} ${clientId}`);
  });
  client.on('reconnect', () => {
    console.log(`RECONNECT - ${Date.now()} ${clientId}`);
  });
  clients.push(client);
}