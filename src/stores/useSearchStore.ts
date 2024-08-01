import {create} from 'zustand';
import { Dayjs } from 'dayjs';

interface SearchState {
    location: string;
    checkInDate: Dayjs | null;
    checkOutDate: Dayjs | null;
    adults: number;
    children: number;
    childrenNames: string[];
    childrenAges: number[];
    selectedNationality: string | null;
    issueCountry: string | null;
    nights: number;
    setLocation: (location: string) => void;
    setCheckInDate: (date: Dayjs | null) => void;
    setCheckOutDate: (date: Dayjs | null) => void;
    setAdults: (adults: number) => void;
    setChildren: (children: number) => void;
    setChildrenNames: (names: string[]) => void;
    setChildrenAges: (ages: number[]) => void;
    setSelectedNationality: (selectedNationality: string | null) => void;
    setIssueCountry: (issueCountry: string | null) => void;
    setNights: (nights: number) => void;
}

const useSearchStore = create<SearchState>((set) => ({
    location: '',
    checkInDate: null,
    checkOutDate: null,
    adults: 0,
    children: 0,
    childrenAges: [],
    childrenNames: [],
    selectedNationality: 'Turkey',
    issueCountry: '',
    nights: 0,
    setLocation: (location) => set({ location }),
    setCheckInDate: (date) => set({ checkInDate: date }),
    setCheckOutDate: (date) => set({ checkOutDate: date }),
    setAdults: (adults) => set({ adults }),
    setChildren: (children) => set({ children }),
    setChildrenNames: (names) => set({ childrenNames: names }),
    setChildrenAges: (ages) => set({ childrenAges: ages }),
    setSelectedNationality: (selectedNationality) => set({ selectedNationality }),
    setIssueCountry: (issueCountry) => set({   issueCountry }),
    setNights: (nights) => set({ nights }),
}));

export default useSearchStore;

