// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { flow, makeAutoObservable } from 'mobx';
import { api } from '../api/ApiRequests';

class Sellers {
  sellers = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.fetchSellers();
  }

  fetchSellers = flow(function* (this: Sellers) {
    this.sellers = [];
    try {
      this.sellers = (yield api.getAllSellers()).data;
    } catch (error) {
      console.log(error);
    }
  });
}

const sellersStore = new Sellers();
export default sellersStore;
