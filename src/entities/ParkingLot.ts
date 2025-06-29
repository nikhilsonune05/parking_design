import { PaymentMethod, SpotType } from "./enums";
import { IParkingFloor, IParkingLot, IParkingSpot, IParkingTicket, IPayment, IVehicle } from "./interfaces";
import { ParkingTicket } from "./ParkingTicket";
import { Payment } from "./Payment";
import { idGenerator } from "./util";


export class ParkingLot implements IParkingLot {
  public floors: IParkingFloor[];
  private activeTickets: Map<string, IParkingTicket> = new Map();

  constructor(floors: IParkingFloor[]) {
    this.floors = floors;
  }

  vehicleEntry(vehicle: IVehicle): IParkingTicket {
    for (const floor of this.floors) {
      const spot = floor.checkAvailableSpotForVehicle(vehicle);
      if (spot) {
        spot.assignVehicle(vehicle);
        const ticket = this.generateTicket(vehicle, spot, floor);
        this.activeTickets.set(ticket.ticketId, ticket);
        return ticket;
      }
    }
    throw new Error("Parking lot full for this vehicle type.");
  }

  vehicleExit(ticketId: string): IPayment {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) throw new Error("Invalid ticket");

    ticket.exitTime = new Date().toISOString();
    ticket.calculatePay(20);

    const payment = new Payment(ticket.totalAmount, PaymentMethod.Cash); // Cash as a Default method
    this.processPayment(payment);

    const floor = this.floors.find(f => f.floorId === ticket.floorId);
    const spot = floor?.parkingSpots.find(s => s.spotId === ticket.spotId);
    spot?.removeVehicle();

    this.activeTickets.delete(ticketId);

    return payment;
  }

  generateTicket(vehicle: IVehicle, spot: IParkingSpot, floor: IParkingFloor): IParkingTicket {
    return new ParkingTicket(
      idGenerator(),
      vehicle.licensePlate,
      spot.spotId,
      floor.floorId,
      new Date().toISOString()
    );
  }

  ifFullForType(type: SpotType): boolean {
    return !this.floors.some(floor => 
      floor.parkingSpots.some(spot => !spot.isOccupied && spot.spotType === type)
    );
  }

  processPayment(payment: IPayment): void {
    payment.process();
  }
}
