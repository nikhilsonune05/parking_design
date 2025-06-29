import { IParkingTicket } from './interfaces';

export class ParkingTicket implements IParkingTicket {
  public exitTime?: string;
  public totalAmount: number = 0;

  constructor(
    public ticketId: string,
    public vehicleNumber: string,
    public spotId: string,
    public floorId: string,
    public entryTime: string
  ) {}

  calculatePay(ratePerHour: number = 20): number {
    if (!this.exitTime) {
      throw new Error("Exit time not set");
    }
    const entry = new Date(this.entryTime);
    const exit = new Date(this.exitTime);
    const durationMs = exit.getTime() - entry.getTime();
    const hours = Math.ceil(durationMs / (1000 * 60 * 60));
    this.totalAmount = hours * ratePerHour;
    return this.totalAmount;
  }
}
