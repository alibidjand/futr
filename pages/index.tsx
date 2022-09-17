import type { NextPage } from "next";
import Social_Component from "../components/futr_form";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Social_Component />
      </main>
    </div>
  );
};

export default Home;
