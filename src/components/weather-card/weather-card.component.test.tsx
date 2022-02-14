import { render } from '@testing-library/react';
import WeatherCardComponent from './weather-card.component';

test('renders learn react link', () => {
  render(<WeatherCardComponent />);
  expect(WeatherCardComponent).toBeTruthy();
});
