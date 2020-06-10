import axios from 'axios';

const GitHubApi = axios.create({
  baseURL: 'https://api.github.com',
});

export default GitHubApi;
