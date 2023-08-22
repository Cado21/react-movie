import React from 'react';

import './MovieCard.css';

const MovieCard = (props) => {
  const { title, src } = props;
  return (
    <div className="MovieCard">
      <img src={src} alt="greatest showman" />
      <div className="title" >
        <span> {title}</span>
      </div>
    </div>
  )
};

export default MovieCard;
