import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const VideoSearchApp = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://pixabay.com/api/videos/', {
        params: {
          key: '47214845-6bb0faa789289b4fb8095dbe5', // Reemplaza con tu API Key de Pixabay
          q: query,
          per_page: 10,
        },
      });

      setVideos(response.data.hits); // Guardar los videos en el estado
    } catch (err) {
      setError('Error al obtener los videos');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos();
  };

  return (
    <div className="app-container">
      <h1 className="header">Buscador de Videos</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar videos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {loading && <p className="loading">Cargando videos...</p>}
      {error && <p className="error">{error}</p>}

      <div className="video-gallery">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <video
              width="320"
              height="240"
              controls
              src={video.videos.small.url}
              alt={video.tags}
            ></video>
            <p>{video.tags}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        
      </footer>
    </div>
  );
};

export default VideoSearchApp;