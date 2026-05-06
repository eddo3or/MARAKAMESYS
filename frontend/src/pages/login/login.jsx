import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.usuario || !formData.password) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/empleados/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre_usuario: formData.usuario,
    password: formData.password
  })
});

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en login');
      }

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log("Guardado:", data.user);


      // 🔥 REDIRECCIÓN
      navigate('/requisiciones');

    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="instituto-titulo">MARAKAME</h1>
          <h2 className="instituto-subtitulo">INSTITUTO MARAKAME</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>USUARIO</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>CONTRASEÑA</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className='login-button' type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;