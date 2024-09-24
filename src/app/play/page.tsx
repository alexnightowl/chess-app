import dynamic from "next/dynamic";

const DynamicChessBoard: any = dynamic(() => import("../components/ChessBoard/ChessBoard"), {
  ssr: false,
});

const ChessPage = () => {
  return <DynamicChessBoard />;
};

export default ChessPage;