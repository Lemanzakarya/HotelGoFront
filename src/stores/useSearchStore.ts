import {create} from 'zustand';
import { Dayjs } from 'dayjs';

interface SearchState {
    location: string;
    checkInDate: Dayjs | null;
    checkOutDate: Dayjs | null;
    adults: number;
    children: number;
    childrenAges: number[];
    selectedNationality: string | null;
    nights: number;
    setLocation: (location: string) => void;
    setCheckInDate: (date: Dayjs | null) => void;
    setCheckOutDate: (date: Dayjs | null) => void;
    setAdults: (adults: number) => void;
    setChildren: (children: number) => void;
    setChildrenAges: (ages: number[]) => void;
    setSelectedNationality: (selectedNationality: string | null) => void;
    setNights: (nights: number) => void;
}

const useSearchStore = create<SearchState>((set) => ({
    location: '',
    checkInDate: null,
    checkOutDate: null,
    adults: 0,
    children: 0,
    childrenAges: [],
    selectedNationality: 'Turkey',
    nights: 0,
    setLocation: (location) => set({ location }),
    setCheckInDate: (date) => set({ checkInDate: date }),
    setCheckOutDate: (date) => set({ checkOutDate: date }),
    setAdults: (adults) => set({ adults }),
    setChildren: (children) => set({ children }),
    setChildrenAges: (ages) => set({ childrenAges: ages }),
    setSelectedNationality: (selectedNationality) => set({ selectedNationality }),
    setNights: (nights) => set({ nights }),
}));

export default useSearchStore;

