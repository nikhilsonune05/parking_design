import { PaymentMethod, SpotType, VehicleType } from "./entities/enums";
import { ParkingFloor } from "./entities/ParkingFloor";
import { ParkingLot } from "./entities/ParkingLot";
import { ParkingSpot } from "./entities/ParkingSpot";
import { Vehicle } from "./entities/Vehicle";


function main() {
  const spotsFloor1 = [
    new ParkingSpot("S1", SpotType.Small),
    new ParkingSpot("S2", SpotType.Medium),
    new ParkingSpot("S3", SpotType.Large),
  ];
  
  const spotsFloor2 = [
    new ParkingSpot("S4", SpotType.Small),
    new ParkingSpot("S5", SpotType.Medium),
    new ParkingSpot("S6", SpotType.Large),
  ];

  const floor1 = new ParkingFloor("F1", spotsFloor1);
  const floor2 = new ParkingFloor("F2", spotsFloor2);

  const lot = new ParkingLot([floor1, floor2]);

  const vehicle1 = new Vehicle("MH12XY0000", VehicleType.Car);
  const ticket1 = lot.vehicleEntry(vehicle1);
  console.log(`Vehicle entered: ${vehicle1.licensePlate}, Ticket ID: ${ticket1.ticketId}`);

  setTimeout(() => {
    ticket1.exitTime = new Date().toISOString();
    const payment = lot.vehicleExit(ticket1.ticketId);
    payment.method = PaymentMethod.Cash;
    payment.process();
    console.log(`Vehicle exited: ${vehicle1.licensePlate}, Amount paid: ₹${payment.amount}, Status: ${payment.status}`);
  }, 1000);
}

main();