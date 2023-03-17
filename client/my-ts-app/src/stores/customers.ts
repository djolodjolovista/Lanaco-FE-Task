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

  async deleteCustomer() {
    for (let i = 0; i < parentStore.selectedRows.length; i++) {
      try {
        parentStore.toggleLoading(true);
        await api.deleteCustomer(parentStore.selectedRows[i]);
      } catch (error) {
        parentStore.toggleLoading(false);
        console.log(error);
      }
    }
    parentStore.toggleLoading(false);
    parentStore.resetSelectedRows();
    await this.fetchCustomers();
  }

  async updateCustomer(id: string, body: any) {
    try {
      parentStore.toggleLoading(true);
      await api.updateCustomer(id, body);
    } catch (error) {
      parentStore.toggleLoading(false);
      console.log(error);
    }
    parentStore.toggleLoading(false);
    await this.fetchCustomers();
    parentStore.resetSelectedRows();
  }

  async createCustomer(body: any) {
    try {
      parentStore.toggleLoading(true);
      await api.createCustomer(body);
    } catch (error) {
      parentStore.toggleLoading(false);
      console.log(error);
    }
    parentStore.toggleLoading(false);
    this.toggleModal();
    await this.fetchCustomers();
    parentStore.resetSelectedRows();
  }
}

const customersStore = new Customers();
export default customersStore;
