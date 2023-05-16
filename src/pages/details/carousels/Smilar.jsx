import React from 'react';

import Carousel from '../../../components/carousel/carousel';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
const Similar = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === 'tv' ? 'Similar TV Shows' : 'Similar Movie';
  console.log(mediaType);

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
