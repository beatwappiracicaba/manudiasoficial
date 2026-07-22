import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (by checking for a token in localStorage)
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gold mb-6">Dashboard</h1>
      <p className="text-white text-center max-w-xl">
        Bem-vindo ao painel de controle. Esta é uma área administrativa simulada.
        {/* Add dashboard content here */}
      </p>
    </div>
  );
}
