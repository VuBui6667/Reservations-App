import axios from 'axios';
// import queryString from 'query-string';

const axiosClient  = axios.create({
    baseURL: "https://6247067a739ac845919610dd.mockapi.io/api/",
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
  });
  
  axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
      return response.data;
    }
  
    return response;
  }, (error) => {
    // Handle errors
    throw error;
  });

export default axiosClient