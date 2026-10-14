import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the joke API section', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Let's Try Joke API/i)).toBeInTheDocument();
});
