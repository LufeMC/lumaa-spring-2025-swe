import MovieRecommendationForm from '../components/MovieRecommendationForm';
import { useNavigate } from 'react-router-dom';

const RecommendPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    alert('Logged out successfully!');
    navigate('/'); // Redirect to login page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#282c34', color: 'white' }}>
        <h2>Movie Recommender 🎥</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>
      <main style={{ padding: '20px' }}>
        <MovieRecommendationForm />
      </main>
    </div>
  );
};

export default RecommendPage;
