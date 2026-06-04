import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });

      // Save the token and name in browser storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);

      // Go to welcome page
      router.push('/welcome');

    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Welcome Back</h1>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Gmail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        {message && <p style={styles.error}>{message}</p>}

        <p style={styles.link}>
          No account yet?{' '}
          <a href="/register" style={styles.anchor}>Register here</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' },
  box: { background: 'white', padding: '40px', borderRadius: '10px', width: '360px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#333' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' },
  error: { textAlign: 'center', color: 'red', marginTop: '10px' },
  link: { textAlign: 'center', marginTop: '15px', fontSize: '13px' },
  anchor: { color: '#2196F3' },
};