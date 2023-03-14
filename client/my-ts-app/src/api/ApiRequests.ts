import axios from 'axios';

export const api = {
  getAllCustomers: () => {
    try {
      return axios.get(`${process.env.REACT_APP_BASE_URL_2}/customers`);
    } catch (error) {
      console.log(error);
    }
  },
  getAllSellers: () => {
    try {
      return axios.get(`${process.env.REACT_APP_BASE_URL_1}/sellers`);
    } catch (error) {
      console.log(error);
    }
  },
  getAllInvoices: () => {
    try {
      return axios.get(`${process.env.REACT_APP_BASE_URL_1}/invoices`);
    } catch (error) {
      console.log(error);
    }
  },
  deleteSeller: (id: string) => {
    try {
      return axios.delete(`${process.env.REACT_APP_BASE_URL_1}/sellers/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  createSeller: (body: any) => {
    try {
      return axios.post(`${process.env.REACT_APP_BASE_URL_1}/sellers`, body);
    } catch (error) {
      console.log(error);
    }
  },
  updateSeller: (id: string, body: any) => {
    try {
      return axios.put(`${process.env.REACT_APP_BASE_URL_1}/sellers/${id}`, body);
    } catch (error) {
      console.log(error);
    }
  },
  getSeller: (id: string) => {
    try {
      return axios.get(`${process.env.REACT_APP_BASE_URL_1}/sellers/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  deleteCustomer: (id: string) => {
    try {
      return axios.delete(`${process.env.REACT_APP_BASE_URL_2}/customers/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  createCustomer: (body: any) => {
    try {
      return axios.post(`${process.env.REACT_APP_BASE_URL_2}/customers`, body);
    } catch (error) {
      console.log(error);
    }
  },
  updateCustomer: (id: string, body: any) => {
    try {
      return axios.put(`${process.env.REACT_APP_BASE_URL_2}/customers/${id}`, body);
    } catch (error) {
      console.log(error);
    }
  },
  getCustomer: (id: string) => {
    try {
      return axios.get(`${process.env.REACT_APP_BASE_URL_2}/customers/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  getInvoice: (id: string) => {
    try {
      return axios.get(`${process.env.REACT_APP_BASE_URL_1}/invoices/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  createInvoice: (body: any) => {
    try {
      return axios.post(`${process.env.REACT_APP_BASE_URL_1}/invoices`, body);
    } catch (error) {
      console.log(error);
    }
  },
  updateInvoice: (id: string, body: any) => {
    try {
      return axios.put(`${process.env.REACT_APP_BASE_URL_1}/invoices/${id}`, body);
    } catch (error) {
      console.log(error);
    }
  },
  deleteInvoice: (id: string) => {
    try {
      return axios.delete(`${process.env.REACT_APP_BASE_URL_1}/invoices/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
};
