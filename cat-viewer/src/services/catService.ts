import axios from 'axios';

// API
const API_URL = 'https://api.thecatapi.com/v1/images/search';

/**
 * Функция для получения списка котиков с API
 * @param limit - Количество котиков на одну страницу
 * @param page - Номер страницы для пагинации
 * @returns Промис с данными о котиках или пустой массив в случае ошибки
 */
export const fetchCats = async (limit = 15, page = 1) => {
  try {
    const response = await axios.get(API_URL, {
      params: { limit, page },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

