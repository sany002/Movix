import React, { useState, useEffect } from 'react';
import './heroBanner.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../components/lazyLoadingImage/img';
import ContentWrapper from '../../components/conentWrapper/contentwrapper';
const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data } = useFetch('/movie/upcoming');

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
    console.log(bg);
  }, [data, url]);

  const serchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    } else {
    }
  };

  return (
    <div className="heroBanner">
      <div className="backdropImage">
        <Img src={background} />
      </div>
      <div className="opacity-layer"></div>

      <ContentWrapper className="">
        <div className="herobannerContent">
          <span className="tittle">Welcome.</span>
          <span className="subtitle">
            Millions of movies, TV show and people to discover. Explore Now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movie or tv show..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={serchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
