import Axios from 'axios';
import Config from '../config/general';

export default {
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async performGetRequest(baseUrl, endpoint) {
      const stage = this.getCurrentEnvironment();
      try {
        const result = await Axios.get(`${baseUrl}/${stage}/${endpoint}`);
        return result.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    async performPostRequest(baseUrl, endpoint, params) {
      const stage = this.getCurrentEnvironment();
      try {
        const result = await Axios.post(`${baseUrl}/${stage}/${endpoint}`, params);
        return result.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    getCurrentEnvironment() {
      if (window.location.hostname === 'register.gotechnica.org') {
        return 'prd';
      }
      if (window.location.hostname === 'register.beta.gotechnica.org') {
        return 'stg';
      }
      return 'dev';
    },
    getEnvVariable(variableName) {
      if (Config.shared[variableName]) {
        return Config.shared[variableName];
      }
      return Config[this.getCurrentEnvironment()][variableName];
    },
  },
};
