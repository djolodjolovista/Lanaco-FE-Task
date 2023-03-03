// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { makeAutoObservable, flow } from 'mobx';
import { api } from '../api/ApiRequests';

class Invoices {
  invoices = [];
  invoice = {};

  constructor() {
    makeAutoObservable(this);
    this.fetchInvoices();
  }

  fetchInvoices = flow(function* (this: Invoices) {
    this.invoices = [];
    try {
      this.invoices = (yield api.getAllInvoices()).data;
    } catch (error) {
      console.log(error);
    }
  });

  getInvoice = flow(function* (this: Invoices, id: string) {
    try {
      this.invoice = (yield api.getInvoice(id)).data;
    } catch (error) {
      console.log(error);
    }
  });
}
const invoicesStore = new Invoices();
export default invoicesStore;
