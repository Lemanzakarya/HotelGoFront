import { create } from "zustand";

interface ProductInfoState {
  productType: number ;
  ownerProvider: number | undefined;
  product: string | undefined;
  culture: string;
  setProduct: (product: string | undefined) => void;
  setOwnerProvider : (ownerProvider: number | undefined) => void;

}

const useProductInfoStore = create(
  persist<ProductInfoState>(
    (set) => ({
      productType: 2,
      ownerProvider:0,
      product: '',
      culture: 'en-US',
      setProduct: (product) => set({product}),
      setOwnerProvider: (ownerProvider) => set({ownerProvider}),
    }),
    {
      name: 'product-info',
      getStorage: () => localStorage,
    }
  
  
  )
);

export default useProductInfoStore;