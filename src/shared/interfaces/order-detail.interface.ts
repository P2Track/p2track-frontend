import { EorderStatus } from "../enum/order-status.enum";

export interface IOrderDetail {
    trackingCode: string,
    orderDate: Date,
    orderStatus: EorderStatus,
    deliveryAddress: string,
    deliveryEstimation: Date,
    productName: string,
    quantity: number,
    totalPrice: number,
    lastUpdate: Date,
}