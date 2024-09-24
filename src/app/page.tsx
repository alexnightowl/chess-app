import { invoke } from "./blitz-server";
import getCurrentUser from "./users/queries/getCurrentUser";
import s from "./styles/Home.module.css";
import Link from "next/link"

const Home = async () => {
  const currentUser = await invoke(getCurrentUser, null);

  return (
    <div className={s.main}>
      <div className={s.mainContent}>
        Hello, {currentUser ? currentUser.name : "guest"}!
      </div>
    </div>
  );
};

export default Home;
