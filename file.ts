const getActiveIndicator = (currentLeg: any) => {
    const legIndex: any = data?.findIndex((leg: any) => leg.name == currentLeg);
    const leg = data[legIndex];

    if (currentLeg == TripStatus.DriverStartedForPickup && leg?.fulfilled) {
      const inTransit = data?.findIndex(
        (leg: any) => leg?.name == TripStatus.InTransit && leg?.fulfilled
      );
      return inTransit == -1;
    } else if (currentLeg == TripStatus.InTransit && leg?.fulfilled) {
      const truckOffLoaded = data?.findIndex(
        (leg: any) => leg?.name == TripStatus.TruckOffLoaded && leg?.fulfilled
      );
      return truckOffLoaded == -1;
    } else if (currentLeg == TripStatus.Delivered && !leg?.fulfilled) {
      const truckOffLoaded = data?.findIndex(
        (leg: any) => leg?.name == TripStatus.TruckOffLoaded && leg?.fulfilled
      );

      return truckOffLoaded !== -1;
    } else if (currentLeg == TripStatus.DriverAssigned) {
      const carrierAccepted = data?.findIndex(
        (l: any) => l?.name == TripStatus.CarrierAccepted && l?.fulfilled
      );
      if (!leg?.fulfilled && carrierAccepted !== -1) {
        return true;
      } else {
        const carrierAccepted = data?.findIndex(
          (l: any) => l?.name == TripStatus.CarrierAccepted && l?.fulfilled
        );
        const startedForPickup = data?.findIndex(
          (leg: any) =>
            leg?.name == TripStatus.DriverStartedForPickup && !leg?.fulfilled
        );
        return startedForPickup !== -1 && carrierAccepted !== -1;
      }
    }
  };