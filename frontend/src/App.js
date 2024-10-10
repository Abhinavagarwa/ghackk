import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebtoonList from './components/WebtoonList';
import VoteComponent from './components/VoteComponent';
const App = () => {
  const [webtoons, setWebtoons] = useState([]);

  const fetchWebtoons = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/webtoon');
      setWebtoons(response.data);
    } catch (error) {
      console.error('Error fetching webtoons:', error);
    }
  };

  useEffect(() => {
    fetchWebtoons();
  }, []);

  return (
    <div>
      <h1>Webtoons</h1>
      <WebtoonList webtoons={webtoons} fetchWebtoons={fetchWebtoons} />
      <VoteComponent />
    </div>
  );
};

export default App;
