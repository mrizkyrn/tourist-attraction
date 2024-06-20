import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/api/users`,
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

export const getAll = async () => {
   try {
      const response = await api.get('/');
      console.log(response.data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const getCurrentUser = async () => {
   try {
      const response = await api.get('/current');
      console.log(response.data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const updateCurrentUser = async (formData: any) => {
   try {
      const response = await api.patch('/current', formData);
      console.log(response.data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const updatePassword = async (formData: any) => {
   try {
      const response = await api.patch('/current/password', formData);
      console.log(response.data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}

export const deleteByUsername = async (username: string) => {
   try {
      const response = await api.delete(`/${username}`);
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
