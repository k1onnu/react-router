import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import Favourites from '../pages/Favourites';

const mockProducts = [
  { id: 1, title: 'Product 1', price: 100, category: 'Test', image: 'test.jpg' },
  { id: 2, title: 'Product 2', price: 200, category: 'Test', image: 'test.jpg' }
];

beforeEach(() => {
  localStorage.clear();
});

const TestWrapper = ({ children, initialFavorites = [] }) => {
  if (initialFavorites.length) {
    localStorage.setItem('favorites', JSON.stringify(initialFavorites));
  }
  
  return (
    <BrowserRouter>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </BrowserRouter>
  );
};

describe('Favourites Page', () => {
  test('displays empty state when no favorites', async () => {
    await act(async () => {
      render(<Favourites />, { wrapper: TestWrapper });
    });
    
    expect(screen.getByText(/Избранное пусто/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти к товарам/i)).toBeInTheDocument();
  });

  test('displays list of favorite products', async () => {
    await act(async () => {
      render(<Favourites />, { 
        wrapper: (props) => <TestWrapper {...props} initialFavorites={mockProducts} />
      });
    });
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  test('shows total price and count', async () => {
    await act(async () => {
      render(<Favourites />, { 
        wrapper: (props) => <TestWrapper {...props} initialFavorites={mockProducts} />
      });
    });
    
    expect(screen.getByText('Всего товаров:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$300.00')).toBeInTheDocument();
  });

  test('can remove product from favorites', async () => {
    await act(async () => {
      render(<Favourites />, { 
        wrapper: (props) => <TestWrapper {...props} initialFavorites={mockProducts} />
      });
    });
    
    const removeButtons = screen.getAllByText(/🗑️ Удалить/i);
    await act(async () => {
      fireEvent.click(removeButtons[0]);
    });
    
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});