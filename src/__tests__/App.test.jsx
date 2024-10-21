// src/__tests__/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/welcome to my app/i);
  expect(titleElement).toBeInTheDocument();
});
