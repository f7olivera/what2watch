import type { NextPage } from 'next'
import Index from "../components/Index";
import styles from '../styles/Home.module.css'
import React from "react";

const Trending: NextPage = () => {
  React.useEffect(() => {
    document.title = 'Trending';
  }, []);

  return (
    <div className={styles.container}>
      <Index id={'trending'} media=''/>
    </div>
  );
}

export default Trending;
