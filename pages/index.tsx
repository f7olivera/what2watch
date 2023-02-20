import type { NextPage } from 'next'
import Index from "../components/Index";
import styles from '../styles/Home.module.css'
import React from "react";


const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Index id={'movie-popular'} media='movie'/>
    </div>
  );
}

export default Home
