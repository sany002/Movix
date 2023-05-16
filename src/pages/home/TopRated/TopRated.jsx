import React, { useState } from 'react';
import Contentwrapper from '../../../components/conentWrapper/contentwrapper';
import SwithTabs from '../../../components/switchTabs/swithTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/carousel';

const TopRated = () => {
  const [endPoint, setEndPoint] = useState('movie');

  const { data, loading } = useFetch(`/${endPoint}/top_rated`);
  console.log(data);

  const OnTabChange = (tab) => {
    setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
  };
  return (
    <div className="carouselSections">
      <Contentwrapper>
        <h6 className="caroselTitle">Top Rated Movies or Tv Show's</h6>
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

export default TopRated;
