// import axios from 'axios';
import './Search.css';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import '../HomePage/HomePage.css';
import spiner from '../../assets/spin-loader.gif';
import { motion } from 'framer-motion';
import { getSearch } from '../../App/Counter/searchSlice';
import { useSelector, useDispatch } from 'react-redux';

const Search = () => {
  const { name } = useParams();
  // const { name } = useParams()
  // const API_Search = 'https://api.themoviedb.org/3/search/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&query=' + name;
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const { search } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(true);
  // const [data, setData] = useState();
  // useEffect(() => {
  //   axios
  //     .get(API_Search)
  //     .then((res) => setData(res.data.results))
  //     .catch((err) => console.log(err));
  // }, [API_Search]);

  useEffect(() => {
    dispatch(getSearch(name))
  }, [dispatch, name]);

  //CEK TOKEN
  const credential = localStorage.getItem('credential');
  if (!credential) {
    // dispatch({ type: 'BELUM_MASUK' });
    return <Navigate to="/" replace />;
  }

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div className="Search_wrap">
      <h1 className="text-[2.5rem] p-0">Search Result "{name}"</h1>
      <div className="search_item_wrap">
        {search ? (
          search.map((search, i) => {
            return (
              <motion.div initial={{ x: i % 2 === 0 ? '-100vw' : '100vw' }} animate={{ x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} exit={{ x: i % 2 === 0 ? '-100vw' : '100vw' }}>
                <Link key={search.id} className="Popular_menu_all" to={`/DetailPage/${search.id}`}>
                  {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
                  <img className="poster_all" onLoad={handleImageLoaded} src={API_IMG + `${search.poster_path}`} alt="Movie Popular" />
                  <div className="dec">
                    <h3>{search.title}</h3>
                    <h4>{search.release_date}</h4>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </div>
  );
};

export default Search;
