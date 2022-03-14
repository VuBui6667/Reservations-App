import axios from 'axios';
// import queryString from 'query-string';

const axiosClient  = axios.create({
    baseURL: "https://reservations-app6667.herokuapp.com/api/",
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