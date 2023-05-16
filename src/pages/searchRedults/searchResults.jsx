import React from 'react';
import './searchResult.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/conentWrapper/contentwrapper';
import MovieCard from '../../components/MovieCard/MovideCard';
import noResults from '../../asset/no-results.png';
import Spinner from '../../components/spiner/spineer';

const SearchResults = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(data);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    const initialfetchdata = () => {
      setLoading(true);
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
        (res) => {
          setData(res);
          setPageNum((prev) => prev + 1);
          setLoading(false);
        }
      );
    };

    initialfetchdata();
    setPageNum(1);
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true}></Spinner>}

      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? 'resutls' : 'restlt'
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={Spinner}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === 'person') {
                    return false;
                  }

                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      fromSearch={true}
                    ></MovieCard>
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <>
              <img src={noResults} alt=""></img>
              <span className="resultNotFound">Sorry , Results not Found</span>
            </>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResults;
