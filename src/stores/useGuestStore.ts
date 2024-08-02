import create from 'zustand';

type GuestDetails = {
    title: string;
    gender: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passportNumber: string;
    serialNumber: string;
    expiryDate: string;
    issueCountry: string;
};

type ChildDetails = {
    firstName: string;
    lastName: string;
    age: string;
    passportNumber: string;
    serialNumber: string;
    expiryDate: string;
    issueCountry: string;
};

type GuestStore = {
    adultDetails: GuestDetails[];
    childDetails: ChildDetails[];
    setAdultDetails: (details: GuestDetails[]) => void;
    setChildDetails: (details: ChildDetails[]) => void;
    updateAdultDetail: (index: number, field: string, value: string) => void;
    updateChildDetail: (index: number, field: string, value: string) => void;
};

const useGuestStore = create<GuestStore>((set) => ({
    adultDetails: [],
    childDetails: [],
    setAdultDetails: (details) => set({ adultDetails: details }),
    setChildDetails: (details) => set({ childDetails: details }),
    updateAdultDetail: (index, field, value) => set((state) => {
        const updatedDetails = [...state.adultDetails];
        updatedDetails[index] = { ...updatedDetails[index], [field]: value };
        return { adultDetails: updatedDetails };
    }),
    updateChildDetail: (index, field, value) => set((state) => {
        const updatedDetails = [...state.childDetails];
        updatedDetails[index] = { ...updatedDetails[index], [field]: value };
        return { childDetails: updatedDetails };
    }),
}));

export default useGuestStore;