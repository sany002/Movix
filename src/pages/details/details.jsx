import React from 'react';
import './details.scss';
import DetailsBanner from './detailBanner/detailsBanner';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Cast from './cast/cast';

import VideosSection from './videosSections/videosSections';

import Recommendation from './carousels/Recomendations';
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  console.log(mediaType);
  return (
    <div>
      <DetailsBanner
        video={data?.results?.[0]}
        crew={credits?.crew}
      ></DetailsBanner>
      -
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading}></VideosSection>
      <Recommendation mediaType={mediaType} id={id}></Recommendation>
    </div>
  );
};

export default Details;
