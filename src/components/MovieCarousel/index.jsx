import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import './MovieCarousel.css';
import Skeleton from 'react-loading-skeleton';



const MovieCarousel = (props) => {
  const {isLoading = false, items = [], onClickItem} = props;

  const _renderSkeleton = () => {
    return (
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={36}
        slidesOffsetAfter={24}
        slidesOffsetBefore={24}
        centeredSlides
      >
        {[1, 2, 3, 4].map(e => (
          <SwiperSlide key={e} >
            <Skeleton height={400} />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }
  return (
    <div className="Carousel">
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={36}
        slidesOffsetAfter={24}
        slidesOffsetBefore={24}
        centeredSlides
        loop
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
      >
        {isLoading ? _renderSkeleton() : (
          items.map(item => {
            return (
              <SwiperSlide key={item.id} onClick={clickEvent => {onClickItem(clickEvent, item)}}>
                <div className={`carousel-content`}>
                  <div className="content-padding content-img">
                    <img src={item.src} alt={item.altText} />
                  </div>
                  <div className="content-padding content">
                    <h1>{item.altText}</h1>
                    <p>{item.caption}</p>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        )}
      </Swiper>
    </div>
  )
};


export default MovieCarousel;
