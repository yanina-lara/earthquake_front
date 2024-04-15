const API_URL = 'http://localhost:4000/api/features';

const api = {
  getFeatures: async (page, magType = '', perPage) => {
    try {
      const url = `${API_URL}?page=${page}&per_page=${perPage}${magType ? `&mag_type=${magType}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching features');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  },
  saveComment: async (featureId, comment) => {
    try {
      const response = await fetch(`${API_URL}/${featureId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: comment }),
      });
  
      if (!response.ok) {
        throw new Error('Error saving comment');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving comment:', error);
      return null;
    }
  },
};

export default api;
