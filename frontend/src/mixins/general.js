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
    async performRawPostRequest(endpoint, params) {
      try {
        const result = await Axios.put(endpoint, params, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return result.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    async track(event) {
      return this.performPostRequest(this.getEnvVariable('BACKEND_ENDPOINT'), 'track', event);
    },
    async sendAnalyticsEvent(eventType) {
      if (this.getCurrentEnvironment() === 'prd') {
        // return await Axios.post(this.getEnvVariable('ANALYTICS_ENDPOINT'), {type: eventType, "date": (new Date().toLocaleDateString())});
      }
    },
    getCurrentEnvironment() {
      if (window.location.hostname === 'register.bit.camp') {
        return 'prd';
      }
      if (window.location.hostname === 'register.beta.bit.camp') {
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
