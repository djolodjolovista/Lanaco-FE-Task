// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { makeAutoObservable, flow } from 'mobx';
import { api } from '../api/ApiRequests';

export interface Invoice {
  sellerName: string;
  customerName: string;
  date: Date | undefined;
  amount: number;
  sellerId: string;
  customerId: string;
}

class Invoices {
  invoices = [];
  invoice: Invoice | null;
  showModal = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchInvoices();
    this.invoice = null;
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

  get selectedInvoice() {
    return this.invoice;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
const invoicesStore = new Invoices();
export default invoicesStore;
