import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  // These store what the user types
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter(); // lets us navigate to another page

  // This runs when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault(); // stops page from refreshing

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:3001/auth/register', {
        name,
        email,
        password,
      });

      setMessage(response.data.message);

      // Go to login page after 1.5 seconds
      setTimeout(() => router.push('/login'), 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Register
          </button>
        </form>

        {/* Show success or error message */}
        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.link}>
          Already have an account?{' '}
          <a href="/login" style={styles.anchor}>Login here</a>
        </p>
      </div>
    </div>
  );
}

// Simple styles
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' },
  box: { background: 'white', padding: '40px', borderRadius: '10px', width: '360px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#333' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' },
  message: { textAlign: 'center', color: '#4CAF50', marginTop: '10px' },
  link: { textAlign: 'center', marginTop: '15px', fontSize: '13px' },
  anchor: { color: '#4CAF50' },
};