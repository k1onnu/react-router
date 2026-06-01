import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import App from '../App';

jest.mock('../pages/Home', () => () => <div>Home Page</div>);
jest.mock('../pages/List', () => () => <div>List Page</div>);
jest.mock('../pages/About', () => () => <div>About Page</div>);
jest.mock('../pages/Favourites', () => () => <div>Favourites Page</div>);
jest.mock('../pages/Details', () => () => <div>Details Page</div>);

describe('App Component', () => {
  test('renders navigation', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </BrowserRouter>
      );
    });
    
    expect(screen.getByText(/🛍️ Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Избранное/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
  });
});