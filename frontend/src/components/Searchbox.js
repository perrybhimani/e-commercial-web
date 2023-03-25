import React, {useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
export default function Searchbox(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.replace(`/search/?q=${searchKeyword}`);
      };

  return (
    <div className="loading">
       <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => {  setSearchKeyword(e.target.value)}}
            />
            <button type="submit">Search</button>
          </form>
    </div>
  );
}
