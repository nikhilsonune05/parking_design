import { SpotType, VehicleType } from "./enums";
import { IParkingFloor, IParkingSpot, IVehicle } from "./interfaces";

export class ParkingFloor implements IParkingFloor {

    public floorId: string;
    public parkingSpots: IParkingSpot[] = [];

    constructor(
        floorId: string,
        parkingSpots: IParkingSpot[]
    ) {
        this.floorId = floorId;
        this.parkingSpots = parkingSpots;
    }

    checkAvailableSpotForVehicle(vehicle: IVehicle): IParkingSpot | undefined {
        return this.parkingSpots.find((spot: IParkingSpot) => !spot.isOccupied && this.canVehicleFitInSpot(vehicle, spot));
    }

    private canVehicleFitInSpot(vehicle: IVehicle, spot: IParkingSpot): boolean {
        if (vehicle.vehicleType === VehicleType.Bike && spot.spotType === SpotType.Small) return true;
        if (vehicle.vehicleType === VehicleType.Car && spot.spotType === SpotType.Medium) return true;
        if (vehicle.vehicleType === VehicleType.Heavy && spot.spotType === SpotType.Large) return true;
        return false;
    }
}