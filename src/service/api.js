import axios from 'axios';

// Create an axios instance with the base URL and default headers
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    "Content-Type": "application/json"
  }
});


// Export the axios instance for use in other parts of the app
export default instance;
