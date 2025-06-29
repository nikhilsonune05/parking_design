## Parking system Design

- We will follow lower to higher entity approach.

# Entities:

- VehicleType: Enum
    - Type : Bike, Car, Truck

- SpotType: Enum
    - Type : (Small, Medium, Large) : string
    - Rate : According to type

- Vehicle: Class
    - licensePlate: string
    - vehicleType: VehicleType

- ParkingSpot: Class
    - id: string
    - type: SpotType
    - isOccupied: boolean
    - vehicle?: Vehicle

    - assignVehicle(vehicle: Vehicle)
    - removeVehicle()
    - checkIfAvailable()

- ParkingFloor: Class
    - id: string
    - spots: ParkingSpot[]

    - checkAvailableSpotForVehicle(vehicle: Vehicle): ParkingSpot | null

- ParkingLot: Class
    - floors: ParkingFloor[]
    
    - vehicleEntry(vehicle: Vehicle): ParkingTicket
    - vehicleExit(ticketId: string): Payment
    - generateTicket(): ParkingTicket
    - ifFullForType(type): boolean
    - processPayment()

- ParkingTicket: Class
    - id: string
    - vehicleNumber: string
    - spotId: string
    - floorId: string
    - entryTime: string
    - exitTime: string = null
    - totalAmount: number

    - calculatePay()

- PaymentStatus: Enum
    - status: Completed, Failed, Pending

- PaymentMethod: Enum
    - method: Card, Cash, UPI

- Payment: Class
    - amount: number
    - method: PaymentMethod
    - status: PaymentStatus 
    
    - process()



Entity	        Relationship
______________________________________________________
ParkingLot  -   ParkingFloor[]	-   HAS-A
ParkingFloor -  ParkingSpot[]	-   HAS-A
ParkingSpot -   Vehicle	        -   HAS-A (optional)
ParkingLot -    ParkingTicket	-   USES-A
ParkingTicket - spotId, floorId	-   REFERENCES-BY-ID
ParkingLot -    Payment	        -   USES-A
Vehicle -       VehicleType	    -   HAS-A
ParkingSpot -   SpotType	    -   HAS-A



