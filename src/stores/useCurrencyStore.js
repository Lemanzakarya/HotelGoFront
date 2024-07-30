import { create } from 'zustand';

const useCurrencyStore = create((set) => ({
  currencies: [
    { code: 'USD', label: 'US Dollar' },
    { code: 'EUR', label: 'Euro' },
    { code: 'JPY', label: 'Japanese Yen' },
    { code: 'TRY', label: 'Turkish Lira' },
  ],
  
  selectedCurrency: 'USD',
  setSelectedCurrency: (newCurrency) => set({ selectedCurrency: newCurrency }),
}));

export default useCurrencyStore;
