import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000/api/users',
   withCredentials: true,
});

export const register = async (formData: any) => {
   try {
      const response = await api.post('/', formData);
      console.log(response.data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const login = async (formData: any) => {
   try {
      const response = await api.post('/login', formData);
      console.log(response.data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const logout = async () => {
   try {
      const response = await api.post('/logout');
      console.log(response.data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};
