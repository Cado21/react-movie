import React, {useRef} from 'react';
import {FaSearch} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';

import {DEFAULT_SEARCH_VALUE} from '../../constants';

import './Header.css';

const Header = (props) => {
  const { searchValue = DEFAULT_SEARCH_VALUE , setSearchValue } = props;
  const searchInputRef = useRef(null);

  const handleOnClickSearch = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div className="header container">
      <a id='logo' href="/">Netplix</a>
      <div className="nav-container">
        <nav>
          <a href="#">Series</a>
          <a href="#">Movie</a>
          <a href="#">Genre</a>
        </nav>
        <div
          tabIndex="0"
          className={`search-bar`}
          onClick={handleOnClickSearch}
        >
          <span className="icon">
            <FaSearch />
          </span>
          <div className={`search-input`}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder='Movie Title'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <span className="icon" onClick={() => {setSearchValue(DEFAULT_SEARCH_VALUE)}} >
              <IoMdClose />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header;