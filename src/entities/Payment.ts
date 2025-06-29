import { IPayment } from './interfaces';
import { PaymentStatus, PaymentMethod } from './enums';

export class Payment implements IPayment {
  public status: PaymentStatus = PaymentStatus.Pending;

  constructor(
    public amount: number,
    public method: PaymentMethod
  ) {}

  process(): void {
    // processing
    this.status = PaymentStatus.Completed;
  }
}
