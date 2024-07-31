import { create } from "zustand";

interface PriceSearchState {
  searchId: string | undefined;
  offerId: string | undefined;
  productType: number;
  productId: string | undefined;
  currency: string;
  culture: string;
  getRoomInfo: boolean;

  setSearchId: (searchId: string | undefined) => void;
  setOfferId: (offerId: string | undefined) => void;
  setProductType: (productType: number) => void;
  setProductId: (productId: string | undefined) => void;
  setCurrency: (currency: string) => void;
  setCulture: (culture: string) => void;
  setGetRoomInfo: (getRoomInfo: boolean) => void;
}

const usePriceSearchStore = create<PriceSearchState>((set) => ({
  searchId: '',
  offerId: '',
  productType: 2,
  productId: '',
  currency: '',
  culture: 'en-US',
  getRoomInfo: true,
  
  setSearchId: (searchId) => set({ searchId }),
  setOfferId: (offerId) => set({ offerId }),
  setProductType: (productType) => set({ productType }),
  setProductId: (productId) => set({ productId }),
  setCurrency: (currency) => set({ currency }),
  setCulture: (culture) => set({ culture }),
  setGetRoomInfo: (getRoomInfo) => set({ getRoomInfo }),
}));

export default usePriceSearchStore;