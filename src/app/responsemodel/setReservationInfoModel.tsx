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
    transactionId: string;
    expiresOn: string;
    reservationData: ReservationData;
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
    try {
        const beginTransactionResponse = await sendBeginTransactionRequest(postData);
        const transactionId = beginTransactionResponse.body.transactionId;
        const setReservationInfoRequest: SetReservationInfoRequestModel = {
            transactionId: transactionId,
            travellers: beginTransactionResponse.body.reservationData.travellers.map((traveller) => ({
                travellerId: traveller.travellerId,
                type: traveller.type,
                title: traveller.title,
                academicTitle: {
                    id: 0, // STATIC FIELD
                },
                passengerType: traveller.passengerType,
                name: "input for name",//!!!!!!!!
                surname: "input for surname",//!!!!!!!!
                isLeader: traveller.isLeader,
                birthDate: "input for birthDate",//!!!!!!!!
                nationality: {
                    twoLetterCode: "input for twoLetterCode",//!!!!!!!! ???????
                },
                identityNumber: traveller.identityNumber,// ???????
                passportInfo: { // ????? is this much info needed ?????
                    serial: traveller.passportInfo.serial,
                    number: traveller.passportInfo.number,
                    expireDate: traveller.passportInfo.expireDate,
                    issueDate: traveller.passportInfo.issueDate,
                    citizenshipCountryCode: traveller.passportInfo.citizenshipCountryCode,
                    issueCountryCode: traveller.passportInfo.issueCountryCode,
                },
                address: {
                    contactPhone: {
                        countryCode: "input for country code",//!!!!!!!!
                        areaCode: "input for area code",//!!!!!!!!
                        phoneNumber: "input for phone number",//!!!!!!!!
                    },
                    email: traveller.address.email,
                    address: traveller.address.address,
                    zipCode: traveller.address.zipCode,
                    city: {
                        id: traveller.address.city.id,
                        name: traveller.address.city.name,
                    },
                    country: {
                        id: traveller.address.country.id,
                        name: traveller.address.country.name,
                    },
                },
                orderNumber: traveller.orderNumber,
                status: traveller.status,
                gender: 0,//!!!!!!!! INPUT FIELD
            })),
        };
        const response = await fetch("https://localhost:7220/Tourvisio/SetReservationInfo", {
            method:'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(setReservationInfoRequest)
        })
        return await response.json();
    }catch (error) {
        console.error('Error sending reservation info request:', error);
        throw error;
    }
}
export { setReservationInfo };
