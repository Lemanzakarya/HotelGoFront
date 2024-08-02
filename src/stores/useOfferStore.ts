import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OfferState {
  offerIds: string[] | undefined;
  currency: string | undefined;
  thumbnailFull:string | undefined;
  hotelName:string | undefined;
  hotelLocation : string | undefined;
  setHotelLocation : string | undefined;
  setHotelName : (hotelName: string | undefined) => void;
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
      hotelName: '',
      hotelLocation:'',
      setHotelLocation : (hotelLocation) => set({ hotelLocation }),
      setHotelName : (hotelName) => set({ hotelName }),
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