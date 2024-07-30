import {BeginTransactionRequest, sendBeginTransactionRequest} from "@/app/responsemodel/BeginTransactionModel";

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

const setReservationInfo = async (postData : BeginTransactionRequest) : Promise<SetReservationInfoResponse> => {
    console.log("Set Reservation Info started...")
    try {
        const beginTransactionResponse = await sendBeginTransactionRequest(postData);
        const transactionId = beginTransactionResponse.body.transactionId;
        console.log('Begin Transaction -> successfully');
        const setReservationInfoRequest : SetReservationInfoRequestModel = {
            transactionId : transactionId,
            travellers : [
                {
                    travellerId: "1",
                    type: 1,
                    title: 1,
                    academicTitle: {
                        id: 1,
                    },
                    passengerType: 1,
                    name: "Name",
                    surname: "Surname",
                    isLeader: true,
                    birthDate: "1990-10-10T00:00:00",
                    nationality: {
                        twoLetterCode: "DE",//!!!!!!! fetch it
                    },
                    identityNumber: "",
                    passportInfo: {
                        serial: 'a',
                        number: '13',
                        expireDate: "2030-01-01T00:00:00",
                        issueDate: "2020-01-01T00:00:00",
                        citizenshipCountryCode: "",
                        issueCountryCode: "21",
                    },
                    address: {
                        contactPhone: {
                            countryCode: "90",
                            areaCode: "555",
                            phoneNumber: "5555555",
                        },
                        email: "email@test.com",
                        address: "",
                        zipCode: "",
                        city: {
                            id: "",
                            name: "",
                        },
                        country: {
                            id: "",
                            name: "",
                        },
                    },
                    orderNumber: 1,
                    status: 0,
                    gender: 0,
                },
                {
                    travellerId: "2",
                    type: 1,
                    title: 3,
                    academicTitle: {
                        id: 1,
                    },
                    passengerType: 1,
                    name: "SecondName",
                    surname: "Surname",
                    isLeader: false,
                    birthDate: "1990-01-01T00:00:00",
                    nationality: {
                        twoLetterCode: "DE",
                    },
                    identityNumber: "",
                    passportInfo: {
                        serial: 'a',
                        number: '19',
                        expireDate: "2030-01-01T00:00:00",
                        issueDate: "2020-01-01T00:00:00",
                        citizenshipCountryCode: "",
                        issueCountryCode: "12",
                    },
                    address: {
                        contactPhone: {
                            countryCode: "90",
                            areaCode: "555",
                            phoneNumber: "5555555",
                        },
                        email: "email@test.com",
                        address: "",
                        zipCode: "",
                        city: {
                            id: "",
                            name: "",
                        },
                        country: {
                            id: "",
                            name: "",
                        },
                    },
                    orderNumber: 2,
                    status: 0,
                    gender: 1,
                },
            ]
        }
        const response = await fetch("https://localhost:7220/Tourvisio/SetReservationInfo", {
            method:'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(setReservationInfoRequest)
        })
        if (response.ok) {
            console.log('Reservation info request done successfully');
        }else {
            throw new Error('Reservation info request failed');
        }
        return await response.json();
    }catch (error) {
        console.error('Error sending reservation info request:', error);
    }
}
export { setReservationInfo };
