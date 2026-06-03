const API_BASE_URL = 'https://fakestoreapi.com';
const AUTH_API_URL = 'https://reqres.in/api';

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
  },

  async login(email, password) {
    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Неверный email или пароль');
      }

      const data = await response.json();
      
      return {
        token: data.token,
        user: {
          email: email,
          name: email.split('@')[0],
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Ошибка авторизации');
    }
  },

  async verifyToken(token) {
    try {
      if (!token) {
        throw new Error('Токен отсутствует');
      }
      return { valid: true };
    } catch (error) {
      throw new Error(error.message || 'Недействительный токен');
    }
  }
};