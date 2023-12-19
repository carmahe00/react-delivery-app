export interface ResponseMercadoPagoPayment {
    id:                          number;
    date_created:                Date;
    date_approved:               Date;
    date_last_updated:           Date;
    date_of_expiration:          null;
    money_release_date:          Date;
    money_release_status:        string;
    operation_type:              string;
    issuer_id:                   string;
    payment_method_id:           string;
    payment_type_id:             string;
    payment_method:              PaymentMethod;
    status:                      string;
    status_detail:               string;
    currency_id:                 string;
    description:                 string;
    live_mode:                   boolean;
    sponsor_id:                  null;
    authorization_code:          string;
    money_release_schema:        null;
    taxes_amount:                number;
    counter_currency:            null;
    brand_id:                    null;
    shipping_amount:             number;
    build_version:               string;
    pos_id:                      null;
    store_id:                    null;
    integrator_id:               null;
    platform_id:                 null;
    corporation_id:              null;
    payer:                       ResponseMercadoPagoPaymentPayer;
    collector_id:                number;
    marketplace_owner:           null;
    metadata:                    Metadata;
    additional_info:             AdditionalInfo;
    order:                       Metadata;
    external_reference:          null;
    transaction_amount:          number;
    net_amount:                  number;
    taxes:                       Tax[];
    transaction_amount_refunded: number;
    coupon_amount:               number;
    differential_pricing_id:     null;
    financing_group:             null;
    deduction_schema:            null;
    installments:                number;
    transaction_details:         TransactionDetails;
    fee_details:                 FeeDetail[];
    charges_details:             ChargesDetail[];
    captured:                    boolean;
    binary_mode:                 boolean;
    call_for_authorize_id:       null;
    statement_descriptor:        null;
    card:                        Card;
    notification_url:            null;
    refunds:                     any[];
    processing_mode:             string;
    merchant_account_id:         null;
    merchant_number:             null;
    acquirer_reconciliation:     any[];
    point_of_interaction:        PointOfInteraction;
    accounts_info:               null;
    tags:                        null;
    api_response:                APIResponse;
}

export interface AdditionalInfo {
    items:               Item[];
    payer:               AdditionalInfoPayer;
    ip_address:          string;
    available_balance:   null;
    nsu_processadora:    null;
    authentication_code: null;
}

export interface Item {
    id:          string;
    title:       string;
    description: string;
    picture_url: string;
    category_id: string;
    quantity:    string;
    unit_price:  string;
}

export interface AdditionalInfoPayer {
    address:    Address;
    first_name: string;
    last_name:  string;
}

export interface Address {
    zip_code:      string;
    street_name:   string;
    street_number: string;
}

export interface APIResponse {
    status:  number;
    headers: { [key: string]: string[] };
}

export interface Card {
    id:                null;
    first_six_digits:  string;
    last_four_digits:  string;
    expiration_month:  number;
    expiration_year:   number;
    date_created:      Date;
    date_last_updated: Date;
    cardholder:        Cardholder;
}

export interface Cardholder {
    name:           string;
    identification: Identification;
}

export interface Identification {
    number: string;
    type:   string;
}

export interface ChargesDetail {
    id:             string;
    name:           string;
    type:           string;
    accounts:       Accounts;
    client_id:      number;
    date_created:   Date;
    last_updated:   Date;
    amounts:        Amounts;
    metadata:       Metadata;
    reserve_id:     null;
    refund_charges: any[];
}

export interface Accounts {
    from: string;
    to:   string;
}

export interface Amounts {
    original: number;
    refunded: number;
}

export interface Metadata {
}

export interface FeeDetail {
    type:      string;
    amount:    number;
    fee_payer: string;
}

export interface ResponseMercadoPagoPaymentPayer {
    identification: Identification;
    entity_type:    null;
    phone:          Phone;
    last_name:      null;
    id:             string;
    type:           null;
    first_name:     null;
    email:          string;
}

export interface Phone {
    number:    null;
    extension: null;
    area_code: null;
}

export interface PaymentMethod {
    id:        string;
    type:      string;
    issuer_id: string;
    data:      Data;
}

export interface Data {
    routing_data: RoutingData;
}

export interface RoutingData {
    merchant_account_id: string;
}

export interface PointOfInteraction {
    type:          string;
    business_info: BusinessInfo;
}

export interface BusinessInfo {
    unit:     string;
    sub_unit: string;
}

export interface Tax {
    value: number;
    type:  string;
}

export interface TransactionDetails {
    payment_method_reference_id: null;
    acquirer_reference:          null;
    net_received_amount:         number;
    total_paid_amount:           number;
    overpaid_amount:             number;
    external_resource_url:       null;
    installment_amount:          number;
    financial_institution:       null;
    payable_deferral_period:     null;
}
