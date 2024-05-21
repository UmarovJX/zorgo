import { axiosInstance } from '@/services/core/base';
import Core from '@/services/core';

class Osago extends Core {
  constructor(axios = axiosInstance) {
    super(axios);
  }

  fetchPolicies(params = '') {
    if (params) params = '?' + params;
    return this.get('insurance/kasko' + params);
  }

  fetchPolicy(id) {
    return this.get(`insurance/kasko/${id}`);
  }
}

export default Osago;
