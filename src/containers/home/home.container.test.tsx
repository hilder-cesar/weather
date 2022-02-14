import { render } from '@testing-library/react';
import HomeContainer from './home.container';

test('renders learn react link', () => {
  render(<HomeContainer />);
  expect(HomeContainer).toBeTruthy();
});
