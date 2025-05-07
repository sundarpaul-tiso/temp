const getActiveIndicator = (currentLeg: any): boolean => {
  const legIndex = data?.findIndex((leg: any) => leg.name === currentLeg);
  const leg = data?.[legIndex];

  const isFulfilled = (status: TripStatus) =>
    data?.some((leg: any) => leg.name === status && leg.fulfilled);

  const isUnfulfilled = (status: TripStatus) =>
    data?.some((leg: any) => leg.name === status && !leg.fulfilled);

  switch (currentLeg) {
    case TripStatus.DriverStartedForPickup:
      if (leg?.fulfilled) {
        return !isFulfilled(TripStatus.InTransit);
      }
      break;

    case TripStatus.InTransit:
      if (leg?.fulfilled) {
        return !isFulfilled(TripStatus.TruckOffLoaded);
      }
      break;

    case TripStatus.Delivered:
      if (!leg?.fulfilled) {
        return isFulfilled(TripStatus.TruckOffLoaded);
      }
      break;

    case TripStatus.DriverAssigned:
      const carrierAcceptedFulfilled = isFulfilled(TripStatus.CarrierAccepted);
      const startedForPickupUnfulfilled = isUnfulfilled(TripStatus.DriverStartedForPickup);

      if (!leg?.fulfilled && carrierAcceptedFulfilled) {
        return true;
      }

      return carrierAcceptedFulfilled && startedForPickupUnfulfilled;
  }

  return false;
};
