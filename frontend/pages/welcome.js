import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Welcome() {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get name from browser storage
    const savedName = localStorage.getItem('name');

    // If no name (not logged in), go back to login
    if (!savedName) {
      router.push('/login');
    } else {
      setName(savedName);
    }
  }, []);

  function handleLogout() {
    localStorage.clear();       // remove saved login info
    router.push('/login');      // go back to login page
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.greeting}>👋 Hello {name}!</h1>
        <p style={styles.text}>Welcome to our website</p>
        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' },
  box: { background: 'white', padding: '50px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  greeting: { fontSize: '32px', color: '#333', marginBottom: '10px' },
  text: { fontSize: '18px', color: '#666', marginBottom: '30px' },
  button: { padding: '10px 25px', background: '#f44336', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' },
};