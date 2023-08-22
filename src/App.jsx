import {useEffect, useState} from 'react';
import Header from './components/Header';
import MovieCarousel from './components/MovieCarousel';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import MovieList from './components/MovieList';
import {DEFAULT_SEARCH_VALUE, TEMP_MOVIES} from './constants';
import {IoMdClose} from 'react-icons/io'
import ModalPopup from './components/ModalPopup/ModalPopup';


import './App.css';
import axios from 'axios';
import {API_URL, rapidAPIGHeaders} from './utils/api';

function App() {
  // Movie List
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);


  // Movie Detail
  const [isLoadingMovieDetail, setIsLoadingMovieDetail] = useState(false);
  const [movieDetail, setMovieDetail] = useState();

  const [searchValue, setSearchValue] = useState(DEFAULT_SEARCH_VALUE);

  const [isOpenMovieDetail, setIsOpenMovieDetail] = useState(false);
  const callMovieList = async (searchQuery) => {
    setIsLoading(true);
    setMovieList([]);
    try {
      const apiParams = {
        page: 1,
        limit: 20,
      };
      if (searchQuery) {
        apiParams.query = searchQuery;
      };

      const {data} = await axios.get(API_URL.MOVIE_LIST_QUERY, {
        headers: rapidAPIGHeaders,
        params: apiParams,
      });

      if (data.status === 200) {
        const finalResults = data.results.map(eachResult => {
          const {_id, } = eachResult;
          return {
            id: _id,
            description: eachResult.description,
            genres: eachResult.genres,
            image: eachResult.image,
            uuid: eachResult.uuid,
            year: eachResult.year,
            titleOriginal: eachResult.titleOriginal,
            release: eachResult.release,
            rating: eachResult.rating,
          }
        });
        setMovieList(finalResults);
      };
    } catch (error) {
      setMovieList(TEMP_MOVIES);
      alert(`Error: ${error} | Make sure you add your API Key`);
    } finally {
      setIsLoading(false);
    }

  };

  const getMovieById = async (movieId) => {
    if (!movieId) return;

    setIsLoadingMovieDetail(true);
    try {
      const movieByIdResponse = await axios.get(`${API_URL.MOVIE_ID_BY_ID}/${movieId}`, {
        headers: rapidAPIGHeaders,
      });
      const DEFAULT_EMBED_VIDEO = 'https://www.youtube.com/embed/pv3ywF06Idk';
      const movieDetail = {};
      if (movieByIdResponse.status === 200) {
        const {result} = movieByIdResponse.data;
        movieDetail.embedSrc = DEFAULT_EMBED_VIDEO;
        movieDetail.title = result.title || 'Default Title Here';
        movieDetail.description = result.description || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, suscipit eum consectetur dolorem tenetur veniam expedita beatae fugit error minus! Vitae deleniti excepturi atque dolorum provident voluptatibus exercitationem fugiat mollitia!';
      }
      setMovieDetail(movieDetail);
    } catch (error) {
      alert(`Error get movie By ID: ${error} | Make sure you add your API Key`);
    }
    setIsLoadingMovieDetail(false);
  }

  useEffect(() => {
    callMovieList();
  }, []);

  const _renderSearchResult = (_searchValue) => {
    const searchResult = movieList
      .filter(eachMovie => new RegExp(_searchValue.toUpperCase()).test(eachMovie.titleOriginal.toUpperCase()))
      .map(filteredMovie => ({
        id: filteredMovie.id,
        img: filteredMovie.image,
        title: filteredMovie.titleOriginal,
      }))

    return (
      <MovieList
        title={searchResult?.length === 0 ? 'No Result' : "Search Result"}
        list={searchResult}
        onClick={(e, selectedMovie) => {
          showMovieDetail(selectedMovie.id)
        }}
      />
    )

  };

  const showMovieDetail = (movieId) => {
    setIsOpenMovieDetail(true);
    getMovieById(movieId);
  }
  return (
    <SkeletonTheme baseColor="#212121" highlightColor="#636363">
      <div className="App">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />

        {searchValue !== '' ? (
          _renderSearchResult(searchValue)
        ) : (
          <div className="content-margin">
            <MovieCarousel
              isLoading={isLoading}
              onClickItem={(clickEvent, item) => {
                clickEvent.stopPropagation();
                showMovieDetail(item.id);
              }}
              items={
                movieList.map(eachMovie => (
                  {
                    src: eachMovie.image,
                    altText: eachMovie.titleOriginal,
                    caption: eachMovie.description,
                    id: eachMovie.id,
                  }
                ))}
            />

            <MovieList
              title="Latest"
              isLoading={isLoading}
              list={movieList.map(eachMovie => ({
                id: eachMovie.id,
                img: eachMovie.image,
                title: eachMovie.titleOriginal,
              }))}
              onClick={(e, selectedMovie) => {
                showMovieDetail(selectedMovie.id)
              }}
            />

            <MovieList
              title="Action"
              isLoading={isLoading}
              list={movieList.map(eachMovie => ({
                id: eachMovie.id,
                img: eachMovie.image,
                title: eachMovie.titleOriginal,
              }))}
              onClick={(e, selectedMovie) => {
                showMovieDetail(selectedMovie.id)
              }}
            />
          </div>
        )
        }

      </div >


      <ModalPopup
        show={isOpenMovieDetail}
        onClickOutside={() => setIsOpenMovieDetail(false)}
        onClick={() => setIsOpenMovieDetail(true)}
      >
        <div className="movie-detail-container">
          <div className="close-icon" onClick={(e) => {
            e.stopPropagation();
            setIsOpenMovieDetail(false);
          }}>
            <IoMdClose />
          </div>
          {isLoadingMovieDetail ?
            (
              <>
                <Skeleton height={400} />
                <Skeleton height={36} />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              <>
                <div className="video-player-container">
                  <iframe src={movieDetail?.embedSrc} title={movieDetail?.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className="movie-detail-content">
                  <h1>{movieDetail?.title}</h1>
                  <p>
                    {movieDetail?.description}
                  </p>
                </div>
              </>
            )}

        </div>
      </ModalPopup>
    </SkeletonTheme >
  );
}

export default App;
