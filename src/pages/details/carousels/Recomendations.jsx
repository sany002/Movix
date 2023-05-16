import React from 'react';

import Carousel from '../../../components/carousel/carousel';
import useFetch from '../../../hooks/useFetch';

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <>
      {data?.results.length > 0 ? (
        <>
          <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
          />
        </>
      ) : (
        <>not found</>
      )}
    </>
  );
};

export default Recommendation;
