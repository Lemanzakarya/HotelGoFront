import { create } from "zustand"

interface ProductInfoState {
    productType: number,
    ownerProvider: number,
    product: string,
    culture: string
}

const useProductInfoStore = create<ProductInfoState>((set) => ({
    productType:2,
    ownerProvider:2,
    product:'',
    culture:'en-US',
    setProductInfo: (info: Partial<ProductInfoState>) =>
        set((state) => ({ ...state, ...info })),
}))