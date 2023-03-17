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
  selectedRows: string[] = [];
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
    !this.selectedRows.includes(id) && this.selectedRows.push(id);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleLoading(state: boolean) {
    this.loading = state;
  }

  resetSelectedRows() {
    this.selectedRows = [];
  }

  get enabledMenuOptionDelete() {
    return this.selectedRows.length !== 0;
  }

  get enableMenuOptionEdit() {
    return this.selectedRows.length === 1;
  }
}

const parentStore = new Parent();
export default parentStore;
