// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { makeAutoObservable, runInAction } from 'mobx';

export enum Page {
  invoices = 'INVOICES',
  customers = 'CUSTOMERS',
  sellers = 'SELLERS',
  main = ''
}

class Parent {
  activePage: Page = Page.main;
  showModal = false;
  selectedRow = '';
  loading = false;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get currentPage() {
    return this.activePage;
  }

  changeActivePage(page: Page) {
    runInAction(() => {
      this.activePage = page;
    });
  }

  addSelectedRow(id: string) {
    this.selectedRow = id;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleLoading(state: boolean) {
    this.loading = state;
  }

  get enabledMenuOptions() {
    return this.selectedRow !== '';
  }

  /*checkSellersOnInvoices() {
    return invoicesStore.invoices.find(
      (invoice) => (invoice as Invoice).sellerId === this.selectedRow
    );
  }

  checkCustomerOnInvoices() {
    return invoicesStore.invoices.find(
      (invoice) => (invoice as Invoice).customerId === this.selectedRow
    );
  }*/
}

const parentStore = new Parent();
export default parentStore;
