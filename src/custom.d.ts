declare module '*.worker.js' {
  const workerFactory: {
    new (): Worker;
  };
  export default workerFactory;
}

interface ImportMeta {
  url: string;
}

declare module 'stockfish.wasm' {
  function Stockfish(): Worker;
  export default Stockfish;
}