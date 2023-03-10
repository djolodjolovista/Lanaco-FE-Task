// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { flow, makeAutoObservable } from 'mobx';
import { api } from '../api/ApiRequests';
import parentStore from './parent';

export interface Customer {
  name: string;
  surname: string;
  adress: string;
  age: number;
}

class Customers {
  customers = [];
  customer: Customer = { name: '', surname: '', adress: '', age: 0 };
  showModal = false;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.fetchCustomers();
  }
  fetchCustomers = flow(function* (this: Customers) {
    this.customers = [];
    try {
      parentStore.toggleLoading(true);
      this.customers = (yield api.getAllCustomers()).data;
      parentStore.toggleLoading(false);
    } catch (error) {
      parentStore.toggleLoading(false);
      console.log(error);
    }
  });

  getCustomer = flow(function* (this: Customers, id: string) {
    try {
      this.customer = (yield api.getCustomer(id)).data;
    } catch (error) {
      console.log(error);
    }
  });

  toggleModal() {
    this.showModal = !this.showModal;
  }
}

const customersStore = new Customers();
export default customersStore;
