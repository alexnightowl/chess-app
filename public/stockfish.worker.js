importScripts('/stockfish.js');

const engine = typeof Stockfish === 'function' ? Stockfish() : STOCKFISH();

engine.onmessage = function (event) {
  const message = event.data;
  console.log('Engine каже:', message);
  self.postMessage(message);
};

self.onmessage = function (event) {
  const message = event.data;
  console.log('Worker отримав повідомлення:', message);
  engine.postMessage(message);
};
