const API_BASE_URL = 'https://fakestoreapi.com';

export const api = {
  async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки товаров');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Не удалось загрузить товары');
    }
  },

  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки товара');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Не удалось загрузить товар');
    }
  }
};