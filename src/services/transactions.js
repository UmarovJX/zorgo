import { axiosInstance } from '@/services/core/base';
import Core from '@/services/core';

class Transactions extends Core {
  constructor(axios = axiosInstance) {
    super(axios);
  }

  fetchAll(params = '') {
    return this.get('wallet-transaction' + (params ? '?' + params : ''));
  }
  fetchClients(params = '') {
    return this.get('client' + (params ? '?' + params : ''));
  }

  fetchClient(id) {
    return this.get('client/' + id);
  }
  updateClientBalance(id, amount) {
    return this.put('client/' + id, { balance: amount });
  }
}

export default Transactions;
