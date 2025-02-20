import { useState } from 'react';
import axios from 'axios';

interface Movie {
  title: string;
  overview: string;
}

const MovieRecommendationForm = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  const getRecommendations = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please log in to get recommendations.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/recommend',
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecommendations(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error fetching recommendations.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getRecommendations();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>🎬 Movie Recommendations</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter your movie preferences..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '60%',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Get Recommendations
        </button>
      </form>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          textAlign: 'left',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {recommendations.map((movie, index) => (
          <li
            key={index}
            style={{
              marginBottom: '15px',
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <strong style={{ fontSize: '18px' }}>{movie.title}</strong>
            <p style={{ marginTop: '5px', fontSize: '14px', color: '#555' }}>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieRecommendationForm;
