import Axios from 'axios';
import Config from '../config/general';

export default {
  methods: {
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
        return 'prod';
      }
      if (window.location.hostname === 'register-staging.gotechnica.org') {
        return 'stage';
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