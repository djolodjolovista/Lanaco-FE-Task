import { makeAutoObservable, flow } from 'mobx';
import { api } from '../api/ApiRequests';
import parentStore from './parent';

export interface Invoice {
  id: string;
  sellerName: string;
  customerName: string;
  date: string | undefined;
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
      parentStore.toggleLoading(true);
      this.invoices = (yield api.getAllInvoices()).data;
      parentStore.toggleLoading(false);
    } catch (error) {
      parentStore.toggleLoading(false);
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

  get numberOfPages() {
    return Math.round(this.invoices.length / 4);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  checkSellersOnInvoices() {
    return invoicesStore.invoices.find(
      (invoice) => (invoice as Invoice).sellerId === parentStore.selectedRow
    );
  }

  checkCustomerOnInvoices() {
    return invoicesStore.invoices.find(
      (invoice) => (invoice as Invoice).customerId === parentStore.selectedRow
    );
  }

  async deleteInvoice() {
    parentStore.toggleLoading(true);
    try {
      await api.deleteInvoice(parentStore.selectedRow);
    } catch (error) {
      console.log(error);
    }

    parentStore.toggleLoading(false);
    parentStore.addSelectedRow('');
    await this.fetchInvoices();
  }

  async updateInvoice(id: string, body: any) {
    try {
      await api.updateInvoice(id, body);
    } catch (error) {
      console.log(error);
    }
    await this.fetchInvoices();
    parentStore.addSelectedRow('');
  }

  async createInvoice(body: any) {
    try {
      await api.createInvoice(body);
    } catch (error) {
      console.log(error);
    }

    await this.fetchInvoices();
    parentStore.addSelectedRow('');
    this.toggleModal();
  }
}
const invoicesStore = new Invoices();
export default invoicesStore;
