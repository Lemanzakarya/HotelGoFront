import { create } from 'zustand';

interface OfferState {
  offerIds: string[];
  currency: string;

  setOfferIds: (offerIds: string[]) => void;
  setCurrency: (currency: string) => void;
  setOfferDetails: (offerIds: string[], currency: string) => void; 
}

const useOfferStore = create<OfferState>((set) => ({
  offerIds: [],
  currency: '',

  setOfferIds: (offerIds) => set({ offerIds }),
  setCurrency: (currency) => set({ currency }),
  setOfferDetails: (offerIds, currency) => set({ offerIds, currency }), 
}));


export default useOfferStore;