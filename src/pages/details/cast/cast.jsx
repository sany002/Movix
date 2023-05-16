import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';

import ContentWrapper from '../../../components/conentWrapper/contentwrapper';
import Img from '../../../components/lazyLoadingImage/img';
import avatar from '../../../asset/avatar.png';

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  console.log(url);
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              let imgurl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div className="listItem" key={item.id}>
                  <div className="profileImg">
                    <Img src={imgurl}></Img>
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
