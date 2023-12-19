

interface Transport {

    deliver(): any

}

class TruckTransport implements Transport {

    deliver(): any {}

}

class ShipTransport implements Transport {

    deliver(): any {}

}