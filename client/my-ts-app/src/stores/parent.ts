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

  toggleModal() {
    this.showModal = !this.showModal;
  }
}

const parentStore = new Parent();
export default parentStore;
