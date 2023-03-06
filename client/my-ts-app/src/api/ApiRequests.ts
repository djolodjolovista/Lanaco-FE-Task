import axios from 'axios';

export const api = {
  getAllCustomers: () => axios.get('https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers'),
  getAllSellers: () => axios.get('https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers'),
  getAllInvoices: () => axios.get('https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices'),
  getCustomer: (id: string) =>
    axios.get(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers/${id}`),
  getInvoice: (id: string) =>
    axios.get(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices/${id}`),
  updateInvoice: (id: string, body: any) =>
    axios.put(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices/${id}`, body)
};
