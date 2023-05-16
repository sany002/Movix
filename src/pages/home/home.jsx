import React from 'react';
import './home.scss';
import HeroBanner from '../heroBanner/heroBanner';
import Trending from './trending/trending';
import Popular from './popular/popular';
import TopRated from './TopRated/TopRated';

const Home = () => {
  return (
    <div className="homePages">
      <HeroBanner></HeroBanner>
      <Trending></Trending>
      <Popular></Popular>
      <TopRated></TopRated>
    </div>
  );
};

export default Home;
