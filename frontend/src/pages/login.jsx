import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';
import { saveToken } from '../utils/auth';
import { CiLogin } from 'react-icons/ci';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/signin", { email, password });
      console.log('Resposta:', res.data);
      saveToken(res.data.token);
      navigate('/');
    } catch (error) {
      if (error.response?.data?.error?.length > 0) {
        const zodMessages = error.response.data.error.map(err => err.message);
        setError(zodMessages.join(' | '));
      }
      else if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
      else {
        setError('Falha ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-hero">
        <CiLogin size={48} />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (error) {
                setError('')
              };
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              if (error) {
                setError('')
              };
            }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default Login;