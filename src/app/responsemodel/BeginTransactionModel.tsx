type BeginTransactionResponse = {
    body: {
        transactionId: string;
        expiresOn: string;
        reservationData: {
            travellers: Traveller[];
            reservationInfo: ReservationInfo;
            services: Service[];
            paymentDetail: PaymentDetail;
        };
        status: number;
        transactionType: number;
    };
};

type Traveller = {
    travellerId: string;
    type: number;
    title: number;
    availableTitles: Title[];
    availableAcademicTitles: Title[];
    isLeader: boolean;
    birthDate: string;
    nationality: {
        twoLetterCode: string;
    };
    identityNumber: string;
    passportInfo: PassportInfo;
    address: Address;
    services: Service[];
    orderNumber: number;
    birthDateFrom: string;
    birthDateTo: string;
    requiredFields: string[];
    passengerType: number;
    additionalFields: AdditionalFields;
    status: number;
};

type Title = {
    id: string;
    name: string;
};

type PassportInfo = {
    serial: string;
    number: string;
    expireDate: string;
    issueDate: string;
    citizenshipCountryCode: string;
    issueCountryCode: string;
};

type Address = {
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

type Service = {
    id: string;
    type: number;
    price: Price;
    passengerType: number;
};

type Price = {
    amount: number;
    currency: string;
};

type AdditionalFields = {
    travellerTypeOrder: string;
    travellerUniqueID: string;
    tourVisio_TravellerId: string;
    paximum_TravellerId: string;
    birthDateFrom: string;
    birthDateTo: string;
};

type ReservationInfo = {
    bookingNumber: string;
    agency: {
        code: string;
        name: string;
    };
    beginDate: string;
    endDate: string;
    note: string;
    salePrice: Price;
    discount: Price;
    totalPrice: Price;
    paymentFrom: number;
    departureCountry: Country;
    departureCity: City;
    arrivalCountry: Country;
    arrivalCity: City;
    createDate: string;
};

type Country = {
    code: string;
    name: string;
    internationalCode: string;
    type: number;
    countryId: string;
    provider: number;
};

type City = {
    code: string;
    name: string;
    type: number;
    id: string;
    provider: number;
};

type ServiceDetail = {
    serviceId: string;
    thumbnail: string;
    hotelDetail: HotelDetail;
    night: number;
    room: string;
    board: string;
    accom: string;
};

type HotelDetail = {
    address: {
        addressLines: string[];
    };
    location: {
        code: string;
        name: string;
        type: number;
        parentId: string;
        countryId: string;
        provider: number;
        isTopRegion: boolean;
        id: string;
    };
    thumbnail: string;
    id: string;
    name: string;
};

type ServiceItem = {
    orderNumber: number;
    note: string;
    serviceDetails: ServiceDetail;
    partnerServiceId: string;
    isMainService: boolean;
    isRefundable: boolean;
    bundle: boolean;
    cancellationPolicies: CancellationPolicy[];
    commission: number;
    confirmationStatus: number;
    serviceStatus: number;
    productType: number;
    id: string;
    code: string;
    name: string;
    beginDate: string;
    endDate: string;
    adult: number;
    child: number;
    infant: number;
    price: Price;
    provider: number;
};

type CancellationPolicy = {
    beginDate: string;
    dueDate: string;
    price: Price;
    provider: number;
};

type PaymentDetail = {
    paymentPlan: PaymentPlan[];
};

type PaymentPlan = {
    paymentNo: number;
    dueDate: string;
    price: {
        percent: number;
        amount: number;
        currency: string;
    };
    paymentStatus: boolean;
};
export type  BeginTransactionRequest = {
    offerIds: string[];
    currency : string;
}

const sendBeginTransactionRequest = async (postData:BeginTransactionRequest) : Promise<BeginTransactionResponse> => {
    console.log("Begin transaction started...");
    try {
        const response = await fetch('https://localhost:7220/Tourvisio/BeginTransaction', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const responseBody = await response.json();

        if (!response.ok) {
            console.error('Server Error:', responseBody);
        }
        return responseBody;
    }catch (error){
        console.log('ERROR AMK: ',error);
        throw error;
    }
}
export { sendBeginTransactionRequest };