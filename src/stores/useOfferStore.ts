import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OfferState {
  offerIds: string[] | undefined;
  currency: string | undefined;
  thumbnailFull:string | undefined;

  setOfferIds: (offerIds: string[] | undefined) => void;
  setCurrency: (currency: string | undefined) => void;
  setThumbnailFull : (thumbnailFull: string | undefined) => void;
  setOfferDetails: (offerIds: string[], currency: string, thumbnailFull:string) => void; 
}

const useOfferStore = create(
  persist<OfferState>(
    (set) => ({
      offerIds: [],
      currency: '',
      thumbnailFull: '',

      setOfferIds: (offerIds) => set({ offerIds }),
      setCurrency: (currency) => set({ currency }),
      setThumbnailFull:(thumbnailFull) => set({ thumbnailFull }),
      setOfferDetails: (offerIds, currency,thumbnailFull) => set({ offerIds, currency,thumbnailFull }), 
    }),
    {
      name: 'offers-store',
      getStorage: () => localStorage
    }
  )
);


export default useOfferStore;