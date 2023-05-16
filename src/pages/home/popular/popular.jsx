import React, { useState } from 'react';
import Contentwrapper from '../../../components/conentWrapper/contentwrapper';
import SwithTabs from '../../../components/switchTabs/swithTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/carousel';

const Popular = () => {
  const [endPoint, setEndPoint] = useState('movie');

  const { data, loading } = useFetch(`/${endPoint}/popular`);
  console.log(data);

  const OnTabChange = (tab) => {
    setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
  };
  return (
    <div className="carouselSections">
      <Contentwrapper>
        <h6 className="caroselTitle">What's Popular</h6>
        <SwithTabs
          data={['Movies', 'TV Shows']}
          onTabChange={OnTabChange}
        ></SwithTabs>
      </Contentwrapper>
      <Carousel
        data={data?.results}
        loading={loading}
        endPoint={endPoint}
      ></Carousel>
    </div>
  );
};

export default Popular;
