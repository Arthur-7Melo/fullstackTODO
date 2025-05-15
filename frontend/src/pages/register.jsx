import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosInstance';
import { FaRegRegistered } from "react-icons/fa";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas não são iguais!");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/signup", { name, email, password });
      setSuccess("Usuário criado com sucesso. Redirecionando para o login...")
      setTimeout(() => {
        navigate('/login', {
          replace: true
        });
      }, 2000);
    } catch (error) {
      if (error.response?.data?.error?.length > 0) {
        const zodMessages = error.response.data.error.map(err => err.message);
        setError(zodMessages.join(' | '));
      }
      else if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
      else {
        setError('Falha ao registrar usuário. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <div className="login-hero">
        <FaRegRegistered size={48} />
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <h2>Sign Up</h2>
        {success && (
          <div className="register-success">{success}</div>
        )}
        {error && <div className="register-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (error) {
                setError('')
              };
            }}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm your Password:</label>
          <input
            type="password"
            placeholder="********"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              if (error) {
                setError('')
              };
            }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        <div className="form-footer">
          <p className="form-footer-p">
            Já possui conta?{' '}
            <Link to="/login" className="form-footer-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;