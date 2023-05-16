import React, { useState } from 'react';
import Contentwrapper from '../../../components/conentWrapper/contentwrapper';
import SwithTabs from '../../../components/switchTabs/swithTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/carousel';

const Trending = () => {
  const [endPoint, setEndPoint] = useState('day');

  const { data, loading } = useFetch('/trending/all/' + endPoint);
  console.log(data);

  const OnTabChange = (tab) => {
    setEndPoint(tab === 'Day' ? 'day' : 'week');
  };
  return (
    <div className="carouselSections">
      <Contentwrapper>
        <h6 className="caroselTitle">Trending</h6>
        <SwithTabs data={['Day', 'Week']} onTabChange={OnTabChange}></SwithTabs>
      </Contentwrapper>
      <Carousel data={data?.results} loading={loading}></Carousel>
    </div>
  );
};

export default Trending;
