import { PaymentMethod, PaymentStatus, SpotType, VehicleType } from "./enums";


export interface IVehicle {
    licensePlate: string;
    vehicleType: VehicleType;
}


export interface IParkingSpot {
    spotId: string,
    spotType: SpotType,
    isOccupied: boolean,
    vehicle: IVehicle | null,

    assignVehicle(vehicle: any): void,
    removeVehicle(): void,
    checkIfAvailable(): boolean
}


export interface IParkingFloor {
    floorId: string,
    parkingSpots: IParkingSpot[],

    checkAvailableSpotForVehicle(vehicle: IVehicle): IParkingSpot | undefined;
    // canVehicleFitInSpot(vehicle: IVehicle, spot: IParkingSpot): boolean;
}


export interface IParkingLot {
    floors: IParkingFloor[];

    vehicleEntry(vehicle: IVehicle): IParkingTicket;
    vehicleExit(ticketId: string): IPayment;
    generateTicket(vehicle: IVehicle, spot: IParkingSpot, floor: IParkingFloor): IParkingTicket;
    ifFullForType(type: SpotType): boolean;
    processPayment(payment: IPayment): void;
}


export interface IParkingTicket {
    ticketId: string;
    vehicleNumber: string;
    spotId: string;
    floorId: string;
    entryTime: string;
    exitTime?: string;
    totalAmount: number;

    calculatePay(ratePerHour: number): number;
}


export interface IPayment {
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;

  process(): void;
}

