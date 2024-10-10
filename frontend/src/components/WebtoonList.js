import React from 'react';
import axios from 'axios';
import './WebtoonList.css'
const WebtoonList = ({ webtoons, setSelectedWebtoon, fetchWebtoons }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/webtoon/${id}`);
      fetchWebtoons();
    } catch (error) {
      console.error('Error deleting webtoon:', error);
    }
  };

  return (
    <div>
      <h2>Webtoon List</h2>
      <ul>
        {webtoons.map((webtoon) => (
          <li key={webtoon._id}>
            <h3>{webtoon.title}</h3>
           
            <img className="im" src={webtoon.image_url} alt={webtoon.title} />
            <p>{webtoon.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebtoonList;
