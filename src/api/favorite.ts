import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/api/favorites`,
   withCredentials: true,
});

export const getByusername = async (username: string) => {
   try {
      const response = await api.get(`/username/${username}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}

export const createFavorite = async (attractionId: number) => {
   try {
      const response = await api.post('/', { attraction_id: attractionId });
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const removeFavorite = async (attractionId: number) => {
   try {
      const response = await api.delete(`/${attractionId}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const checkFavorite = async (attractionId: number) => {
   try {
      const response = await api.get('/check', { params: { attraction_id: attractionId } });
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};