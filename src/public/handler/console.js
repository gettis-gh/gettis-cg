export function sendMessage(message) {
  window.socket.send(message);
}