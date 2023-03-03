// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { flow, makeAutoObservable } from 'mobx';
import { api } from '../api/ApiRequests';

class Customers {
  customers = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.fetchCustomers();
  }
  fetchCustomers = flow(function* (this: Customers) {
    this.customers = [];
    try {
      this.customers = (yield api.getAllCustomers()).data;
    } catch (error) {
      console.log(error);
    }
  });
}

const customersStore = new Customers();
export default customersStore;
