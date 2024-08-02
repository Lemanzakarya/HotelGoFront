import {BeginTransactionRequest, sendBeginTransactionRequest} from "@/app/responsemodel/BeginTransactionModel";
import useGuestStore from "@/stores/useGuestStore";

type SetReservationInfoRequestModel = {
    transactionId: string;
    travellers: {
        travellerId: string;
        type: number;
        title: number;
        academicTitle: {
            id: number;
        };
        passengerType: number;
        name: string;
        surname: string;
        isLeader: boolean;
        birthDate: string;
        nationality: {
            twoLetterCode: string;
        };
        identityNumber: string;
        passportInfo: {
            serial: string;
            number: string;
            expireDate: string;
            issueDate: string;
            citizenshipCountryCode: string;
            issueCountryCode: string;
        };
        address: {
            contactPhone: {
                countryCode: string;
                areaCode: string;
                phoneNumber: string;
            };
            email: string;
            address: string;
            zipCode: string;
            city: {
                id: string;
                name: string;
            };
            country: {
                id: string;
                name: string;
            };
        };
        orderNumber: number;
        status: number;
        gender: number;
    }[];
};

interface SetReservationInfoResponse {
    body: {
        transactionId: string;
        expiresOn: string;
        reservationData: ReservationData;
    }
}

interface ReservationData {
    travellers: Traveller[];
    reservationInfo: ReservationInfo;
    services: Service[];
    paymentDetail: PaymentDetail;
}

interface Traveller {
    travellerId: string;
    type: number;
    title: number;
    availableTitles: Title[];
    availableAcademicTitles: Title[];
    isLeader: boolean;
    birthDate: string;
    nationality: Nationality;
    identityNumber: string;
    passportInfo: PassportInfo;
    address: Address;
    services: Service[];
    orderNumber: number;
    birthDateFrom: string;
    birthDateTo: string;
    requiredFields: string[];
    passangerType: number;
    additionalFields: AdditionalFields;
    status: number;
}

interface Title {
    id: string;
    name: string;
}

interface Nationality {
    twoLetterCode: string;
}

interface PassportInfo {
    serial: string;
    number: string;
    expireDate: string;
    issueDate: string;
    citizenshipCountryCode: string;
    issueCountryCode: string;
}

interface Address {
    email: string;
    address: string;
    zipCode: string;
    city: City;
    country: Country;
}

interface City {
    id: string;
    name: string;
}

interface Country {
    id: string;
    name: string;
}

interface Service {
    id: string;
    type: number;
    price: Price;
    passangerType: number;
    orderNumber?: number;
    note?: string;
    serviceDetails?: ServiceDetails;
    partnerServiceId?: string;
    isMainService?: boolean;
    isRefundable?: boolean;
    bundle?: boolean;
    cancellationPolicies?: CancellationPolicy[];
    commission?: number;
    confirmationStatus?: number;
    serviceStatus?: number;
    productType?: number;
    code?: string;
    name?: string;
    beginDate?: string;
    endDate?: string;
    adult?: number;
    child?: number;
    infant?: number;
    provider?: number;
}

interface Price {
    amount: number;
    currency: string;
}

interface ServiceDetails {
    serviceId: string;
    thumbnail: string;
    hotelDetail: HotelDetail;
    night: number;
    room: string;
    board: string;
    accom: string;
}

interface HotelDetail {
    address: HotelAddress;
    location: Location;
    thumbnail: string;
    id: string;
    name: string;
}

interface HotelAddress {
    addressLines: string[];
}

interface Location {
    code: string;
    name: string;
    type: number;
    parentId: string;
    countryId: string;
    provider: number;
    isTopRegion: boolean;
    id: string;
}

interface CancellationPolicy {
    dueDate: string;
    price: Price;
    provider: number;
}

interface ReservationInfo {
    bookingNumber: string;
    agency: Agency;
    beginDate: string;
    endDate: string;
    note: string;
    salePrice: Price;
    discount: Price;
    totalPrice: Price;
    paymentFrom: number;
    departureCountry: LocationDetail;
    departureCity: LocationDetail;
    arrivalCountry: LocationDetail;
    arrivalCity: LocationDetail;
    createDate: string;
}

interface Agency {
    code: string;
    name: string;
}

interface LocationDetail {
    code: string;
    name: string;
    internationalCode?: string;
    type: number;
    countryId?: string;
    provider?: number;
    id?: string;
}

interface AdditionalFields {
    travellerTypeOrder: string;
    travellerUniqueID: string;
    tourVisio_TravellerId: string;
    paximum_TravellerId: string;
    birthDateFrom: string;
    birthDateTo: string;
}

interface PaymentDetail {
    paymentPlan: PaymentPlan[];
}

interface PaymentPlan {
    paymentNo: number;
    dueDate: string;
    price: PaymentPlanPrice;
    paymentStatus: boolean;
}

interface PaymentPlanPrice {
    percent: number;
    amount: number;
    currency: string;
}


const setReservationInfo = async (transactionId: string): Promise<SetReservationInfoResponse> => {
    const { adultDetails, childDetails } = useGuestStore.getState?.();
    console.log("data from zustand: ", adultDetails, childDetails);
    // Transform store data to match the request model
    const travellers = [
        ...adultDetails.map((adult, index) => ({
            travellerId: (index + 1).toString(), // Assuming IDs are sequential and start from 1
            type: 1, // Set default type or map if needed
            title: 1, // Map title if necessary
            academicTitle: { id: 1 }, // Map academic title if needed
            passengerType: 1, // Set default or map if needed
            name: adult.firstName,
            surname: adult.lastName,
            isLeader: index === 0, // Assuming the first adult is the leader
            birthDate: "", // Fetch or derive birth date if available
            nationality: { twoLetterCode: "DE" }, // Fetch or derive nationality code if available
            identityNumber: "", // Map if needed
            passportInfo: {
                serial: adult.serialNumber,
                number: adult.passportNumber,
                expireDate: adult.expiryDate,
                issueDate: "", // Fetch or derive issue date if available
                citizenshipCountryCode: "",
                issueCountryCode: "DE", // Fetch or derive issue country code if available
            },
            address: {
                contactPhone: {
                    countryCode: "", // Map or derive country code
                    areaCode: "", // Map or derive area code
                    phoneNumber: adult.phone,
                },
                email: adult.email,
                address: "", // Map or derive address if available
                zipCode: "", // Map or derive zip code if available
                city: { id: "", name: "" }, // Map or derive city details if available
                country: { id: "", name: "" }, // Map or derive country details if available
            },
            orderNumber: index + 1,
            status: 0, // Set default or map if needed
            gender: adult.gender === "male" ? 0 : 1, // Assuming 0 for male and 1 for female
        })),
        ...childDetails.map((child, index) => ({
            travellerId: (adultDetails.length + index + 1).toString(),
            type: 2, // Assuming type 2 for children
            title: 1, // Map title if necessary
            academicTitle: { id: 1 }, // Map academic title if needed
            passengerType: 2, // Assuming type 2 for children
            name: child.firstName,
            surname: child.lastName,
            isLeader: false,
            birthDate: "", // Fetch or derive birth date if available
            nationality: { twoLetterCode: "DE" }, // Fetch or derive nationality code if available
            identityNumber: "", // Map if needed
            passportInfo: {
                serial: child.serialNumber,
                number: child.passportNumber,
                expireDate: child.expiryDate,
                issueDate: "", // Fetch or derive issue date if available
                citizenshipCountryCode: child.issueCountry,
                issueCountryCode: "", // Fetch or derive issue country code if available
            },
            address: {
                contactPhone: {
                    countryCode: "", // Map or derive country code
                    areaCode: "", // Map or derive area code
                    phoneNumber: "", // Children might not have phone numbers
                },
                email: "", // Children might not have email addresses
                address: "", // Map or derive address if available
                zipCode: "", // Map or derive zip code if available
                city: { id: "", name: "" }, // Map or derive city details if available
                country: { id: "", name: "" }, // Map or derive country details if available
            },
            orderNumber: adultDetails.length + index + 1,
            status: 0, // Set default or map if needed
            gender: 1, // Assuming 1 for children (not strictly necessary)
        }))
    ];
    console.log("TRAVELLERS: ", travellers);
    const setReservationInfoRequest: SetReservationInfoRequestModel = {
        transactionId: transactionId,
        travellers: travellers
    };

    try {
        const response = await fetch("https://localhost:7220/Tourvisio/SetReservationInfo", {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(setReservationInfoRequest)
        });

        if (response.ok) {
            console.log('Reservation info request done successfully');
        }
        return await response.json();
    } catch (error) {
        console.error('Error sending reservation info request:', error);
        throw error;
    }
}

export { setReservationInfo };
