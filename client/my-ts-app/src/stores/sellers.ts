import { flow, makeAutoObservable } from 'mobx';
import { api } from '../api/ApiRequests';
import parentStore from './parent';

export interface Seller {
  companyName: string;
  hqAdress: string;
  isActive: boolean;
  id: string;
}

class Sellers {
  sellers = [];
  seller: Seller = { companyName: '', hqAdress: '', isActive: false, id: '' };
  showModal = false;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.fetchSellers();
  }

  fetchSellers = flow(function* (this: Sellers) {
    this.sellers = [];
    try {
      parentStore.toggleLoading(true);
      this.sellers = (yield api.getAllSellers()).data;
      parentStore.toggleLoading(false);
    } catch (error) {
      parentStore.toggleLoading(false);
      console.log(error);
    }
  });

  getSeller = flow(function* (this: Sellers, id: string) {
    try {
      this.seller = (yield api.getSeller(id)).data;
    } catch (error) {
      console.log(error);
    }
  });

  toggleModal() {
    this.showModal = !this.showModal;
  }

  checkSellerIsActive(name: string) {
    return this.sellers.find((seller: Seller) => seller.companyName === name && seller.isActive);
  }

  findSeller(name: string) {
    return this.sellers.find((seller: Seller) => seller.companyName === name);
  }

  async deleteSeller() {
    for (let i = 0; i < parentStore.selectedRows.length; i++) {
      try {
        await api.deleteSeller(parentStore.selectedRows[i]);
      } catch (error) {
        console.log(error);
      }
    }

    parentStore.resetSelectedRows();
    await this.fetchSellers();
  }

  async updateSeller(id: string, body: any) {
    try {
      parentStore.toggleLoading(true);
      await api.updateSeller(id, body);
    } catch (error) {
      parentStore.toggleLoading(false);
      console.log(error);
    }
    parentStore.toggleLoading(false);
    await this.fetchSellers();
    parentStore.resetSelectedRows();
  }

  async createSeller(body: any) {
    try {
      parentStore.toggleLoading(true);
      await api.createSeller(body);
    } catch (error) {
      parentStore.toggleLoading(false);
      console.log(error);
    }
    parentStore.toggleLoading(false);
    this.toggleModal();
    await this.fetchSellers();
    parentStore.resetSelectedRows();
  }
}

const sellersStore = new Sellers();
export default sellersStore;
