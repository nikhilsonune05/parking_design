import { VehicleType } from "./enums";
import { IVehicle } from "./interfaces";

export class Vehicle implements IVehicle {

    constructor(
        public licensePlate: string,
        public vehicleType: VehicleType
    ) {
        this.licensePlate = licensePlate;
        this.vehicleType = vehicleType;
    }
}