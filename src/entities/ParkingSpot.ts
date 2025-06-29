import { SpotType } from "./enums";
import { IParkingSpot, IVehicle } from "./interfaces";

export class ParkingSpot implements IParkingSpot {

    public isOccupied: boolean = false;
    public vehicle: IVehicle | null = null;
    public spotId: string;
    public spotType: SpotType;

    constructor(
        public id: string,
        public type: SpotType
    ) {
        this.spotId = id;
        this.spotType = type;
    }

    assignVehicle(vehicle: any): void {
        this.vehicle = vehicle;
        this.isOccupied = true;
    }

    removeVehicle(): void {
        this.vehicle = null;
        this.isOccupied = false;
    }

    checkIfAvailable(): boolean {
        return this.isOccupied;
    }
}