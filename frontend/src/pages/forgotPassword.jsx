import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosInstance';
import { CiLogin } from 'react-icons/ci';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setSuccess("Verifique seu Email para redefinição de senha...")
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
        setError('Falha ao enviar email. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="forgotPass-container">
        <div className="login-hero">
          <CiLogin size={48} />
        </div>
        <form onSubmit={handleSubmit} className="forgotPass-form">
          <h2>Esqueceu a Senha?</h2>
          {success && (
            <div className="register-success">{success}</div>
          )}
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

          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>

          <div className="form-footer">
            <p className="form-footer-p">
              Não precisa redefinir sua senha?{' '}
              <Link to="/login" className="form-footer-link">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;