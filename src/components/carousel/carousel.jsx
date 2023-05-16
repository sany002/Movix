import React, { useRef } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ContentWrapper from '../conentWrapper/contentwrapper';
import Img from '../lazyLoadingImage/img';
import PosterFallback from '../../asset/no-poster.png';
import './carousel.scss';
import CircleRating from '../CircleReating/CircleReating';
import Genres from '../Genres/genres';
const Carousel = ({ data, loading, endPoint, title }) => {
  const { media_type } = useParams();
  console.log(media_type);

  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmout =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({ left: scrollAmout, behavior: 'smooth' });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation('left')}
        ></BsFillArrowLeftCircleFill>
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation('right')}
        />

        {!loading ? (
          <div ref={carouselContainer} className="carouselItems">
            {data?.map((item) => {
              const posterurl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              return (
                <div
                  onClick={() =>
                    navigate(`/${item.media_type || endPoint}/${item.id}`)
                  }
                  className="carouselItem"
                  key={item.id}
                >
                  <div className="posterBlock">
                    <Img src={posterurl}></Img>
                    <CircleRating
                      rating={item.vote_average.toFixed(1)}
                    ></CircleRating>
                    <Genres data={item.genre_ids}></Genres>
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format('MMM,D, YYYY')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
