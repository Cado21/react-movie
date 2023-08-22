import React from 'react';
import MovieCard from '../MovieCard';
import {Swiper, SwiperSlide} from 'swiper/react';
import './MovieList.css';
import Skeleton from 'react-loading-skeleton';

const MovieList = (props) => {
  const {
    title = '',
    list = [],
    onClick = () => { },
    isLoading = false,
  } = props;


  return (
    <div className="MovieList">
      <div className="headerText">{title}</div>
      {isLoading ?
        (
          <Swiper
            slidesPerView={5}
            spaceBetween={16}
            slidesOffsetAfter={24}
            slidesOffsetBefore={24}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((eachList, index) => (
              <SwiperSlide key={eachList.id || index} onClick={e => onClick(e, eachList)}>
                <Skeleton height={300} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
            <Swiper
              slidesPerView={5}
              spaceBetween={16}
              slidesOffsetAfter={24}
              slidesOffsetBefore={24}
            >
              {list.map((eachList, index) => (
                <SwiperSlide key={eachList.id || index} onClick={e => onClick(e, eachList)}>
                  <MovieCard src={eachList.img} title={eachList.title} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}

    </div>
  )
};

export default MovieList;
