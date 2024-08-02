import {create} from 'zustand';

interface FormStore {
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
}

const useFormStore = create<FormStore>(set => ({
  formSubmitted: false,
  setFormSubmitted: (submitted: boolean) => set({ formSubmitted: submitted }),
}));

export default useFormStore;
