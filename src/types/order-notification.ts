export interface IVaNumbers {
    va_number: number
    bank: string
}

export interface IOrderNotification {
    va_numbers?: IVaNumbers[]
    transaction_time: string
    transaction_status: string
    transaction_id: string
    status_message: string
    status_code: string
    payment_type: string
    payment_amounts: string
    order_id: string
    gross_amount: string
    fraud_status: string
    expiry_time: string
    currency: string
    acquirer?: string
}