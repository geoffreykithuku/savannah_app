// src/__tests__/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../App';

// sample passing test

test('renders app', () => {
  render(<App />);
  expect(true).toBe(true);
});