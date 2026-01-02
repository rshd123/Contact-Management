import apiClient from './api';

const contactService = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      const response = await apiClient.get('/contact/get');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create new contact
  createContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contact/post', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete contact
  deleteContact: async (contactId) => {
    try {
      const response = await apiClient.delete(`/contact/delete/${contactId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default contactService;
