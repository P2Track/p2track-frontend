import { UUID } from "crypto";
import { EorderStatus } from "../enum/order-status.enum";

export interface IOrderDetail {
    trackingCode: UUID,
    orderDate: Date,
    orderStatus: EorderStatus,
    deliveryAddress: string,
    deliveryEstimation: Date,
    productName: string,
    quantity: number,
    totalPrice: number,
    lastUpdate: Date,
}