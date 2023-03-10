import axios from 'axios';

export const api = {
  getAllCustomers: () => axios.get('https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers'),
  getAllSellers: () => axios.get('https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers'),
  getAllInvoices: () => axios.get('https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices'),
  deleteSeller: (id: string) =>
    axios.delete(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers/${id}`),
  createSeller: (body: any) =>
    axios.post(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers`, body),
  updateSeller: (id: string, body: any) =>
    axios.put(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers/${id}`, body),
  getSeller: (id: string) =>
    axios.get(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/sellers/${id}`),
  deleteCustomer: (id: string) =>
    axios.delete(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers/${id}`),
  createCustomer: (body: any) =>
    axios.post(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers`, body),
  updateCustomer: (id: string, body: any) =>
    axios.put(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers/${id}`, body),
  getCustomer: (id: string) =>
    axios.get(`https://63fd283e8ef914c555a635e6.mockapi.io/lanaco/customers/${id}`),
  getInvoice: (id: string) =>
    axios.get(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices/${id}`),
  createInvoice: (body: any) =>
    axios.post('https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices', body),
  updateInvoice: (id: string, body: any) =>
    axios.put(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices/${id}`, body),
  deleteInvoice: (id: string) =>
    axios.delete(`https://63fd1fd28ef914c555a5c035.mockapi.io/lanaco/invoices/${id}`)
};
