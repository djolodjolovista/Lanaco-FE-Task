import axios from 'axios';

export const api = {
  getAllCustomers: () => {
    try {
      return axios.get('https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers');
    } catch (error) {
      console.log(error);
    }
  },
  getAllSellers: () => {
    try {
      return axios.get('https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers');
    } catch (error) {
      console.log(error);
    }
  },
  getAllInvoices: () => {
    try {
      return axios.get('https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices');
    } catch (error) {
      console.log(error);
    }
  },
  deleteSeller: (id: string) => {
    try {
      return axios.delete(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  createSeller: (body: any) => {
    try {
      return axios.post(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers`, body);
    } catch (error) {
      console.log(error);
    }
  },
  updateSeller: (id: string, body: any) => {
    try {
      return axios.put(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers/${id}`, body);
    } catch (error) {
      console.log(error);
    }
  },
  getSeller: (id: string) => {
    try {
      return axios.get(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  deleteCustomer: (id: string) => {
    try {
      return axios.delete(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  createCustomer: (body: any) => {
    try {
      return axios.post(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers`, body);
    } catch (error) {
      console.log(error);
    }
  },
  updateCustomer: (id: string, body: any) => {
    try {
      return axios.put(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers/${id}`, body);
    } catch (error) {
      console.log(error);
    }
  },
  getCustomer: (id: string) => {
    try {
      return axios.get(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  getInvoice: (id: string) => {
    try {
      return axios.get(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  createInvoice: (body: any) => {
    try {
      return axios.post('https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices', body);
    } catch (error) {
      console.log(error);
    }
  },
  updateInvoice: (id: string, body: any) => {
    try {
      return axios.put(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices/${id}`, body);
    } catch (error) {
      console.log(error);
    }
  },
  deleteInvoice: (id: string) => {
    try {
      return axios.delete(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
};
