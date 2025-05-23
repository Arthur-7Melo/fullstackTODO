import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axiosInstance';
import { CiLogin } from 'react-icons/ci';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { token = '' } = useParams();

  useEffect(() => {
    if (!token) {
      setError("Token inválido");
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas não são iguais!");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      setSuccess("Senha atualizada com sucesso. Você pode fazer o login");
    } catch (error) {
      if (error.response?.data?.error?.length > 0) {
        const zodMessages = error.response.data.error.map(err => err.message);
        setError(zodMessages.join(' | '));
      }
      else if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
      else {
        setError('Falha ao redefinir senha. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='auth-page'>
      <div className='resetPass-container'>
        <div className="login-hero">
          <CiLogin size={48} />
        </div>

        <form onSubmit={handleSubmit} className='resetPass-form'>
          <h2>Redefinir Senha</h2>
          {success && (
            <div className="register-success">{success}</div>
          )}
          {error && <div className="error">{error}</div>}

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
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;