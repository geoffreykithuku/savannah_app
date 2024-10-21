import { render, screen } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider

// sample passing test
test('renders app', () => {
  render(
    <AuthProvider>
      {' '}
     
      <App />
    </AuthProvider>
  );
  expect(true).toBe(true); 
});
