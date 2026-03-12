import { render, screen } from '@testing-library/react';
import App from './App';

test('renders nutritional insights heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Nutritional Insights/i);
  expect(headingElement).toBeInTheDocument();
});