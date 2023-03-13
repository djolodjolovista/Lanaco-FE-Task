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
  id: string;
}

class Customers {
  customers = [];
  customer: Customer = { name: '', surname: '', adress: '', age: 0, id: '' };
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

  findCustomer(name: string) {
    return this.customers.find(
      (customer: Customer) => customer.name + ` ` + customer.surname === name
    );
  }
}

const customersStore = new Customers();
export default customersStore;
