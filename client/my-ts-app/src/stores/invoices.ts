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

  toggleModal() {
    this.showModal = !this.showModal;
  }

  checkSellersOnInvoices() {
    return this.invoices.some((invoice: Invoice) =>
      parentStore.selectedRows.includes(invoice.sellerId)
    );
  }

  checkCustomerOnInvoices() {
    return this.invoices.some((invoice: Invoice) =>
      parentStore.selectedRows.includes(invoice.customerId)
    );
  }

  async deleteInvoice() {
    parentStore.toggleLoading(true);
    for (let i = 0; i < parentStore.selectedRows.length; i++) {
      try {
        await api.deleteInvoice(parentStore.selectedRows[i]);
      } catch (error) {
        console.log(error);
        parentStore.toggleLoading(false);
      }
    }
    parentStore.resetSelectedRows();
    await this.fetchInvoices();
    parentStore.toggleLoading(false);
  }

  async updateInvoice(id: string, body: any) {
    try {
      parentStore.toggleLoading(true);
      await api.updateInvoice(id, body);
    } catch (error) {
      console.log(error);
      parentStore.toggleLoading(false);
    }
    await this.fetchInvoices();
    parentStore.resetSelectedRows();
    parentStore.toggleLoading(false);
  }

  async createInvoice(body: any) {
    try {
      parentStore.toggleLoading(true);
      await api.createInvoice(body);
    } catch (error) {
      console.log(error);
      parentStore.toggleLoading(false);
    }
    this.toggleModal();
    await this.fetchInvoices();
    parentStore.toggleLoading(false);
    parentStore.resetSelectedRows();
  }
}
const invoicesStore = new Invoices();
export default invoicesStore;
