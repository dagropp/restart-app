import { useCityContext } from '../context';

interface FlightsItem {
  price: number;
  duration: number;
  link: string;
}

interface CheapestFlightItem extends FlightsItem {
  isDirect: boolean;
}

export type FlightsData =
  | {
      isFlights: false;
      isDirectAvailable: false;
      isRange: false;
      direct: undefined;
      stops: undefined;
      cheapest: undefined;
      get: (isDirect: boolean) => undefined;
    }
  | {
      isFlights: true;
      isDirectAvailable: true;
      isRange: false;
      direct: FlightsItem;
      stops: undefined;
      cheapest: CheapestFlightItem;
      get: (isDirect: boolean) => FlightsItem;
    }
  | {
      isFlights: true;
      isDirectAvailable: true;
      isRange: true;
      direct: FlightsItem;
      stops: FlightsItem;
      cheapest: CheapestFlightItem;
      get: (isDirect: boolean) => FlightsItem;
    }
  | {
      isFlights: true;
      isDirectAvailable: false;
      isRange: false;
      direct: undefined;
      stops: FlightsItem;
      cheapest: CheapestFlightItem;
      get: (isDirect: boolean) => FlightsItem;
    };

const getLink = (key: string, isDirect: boolean) =>
  `https://www.kiwi.com/en/search/results/tel-aviv-israel/${key}?stopNumber=${isDirect ? 0 : 1}~true`;

const getCheapest = (
  isFlights: boolean,
  isRange: boolean,
  direct?: FlightsItem,
  stops?: FlightsItem,
): CheapestFlightItem | undefined => {
  if (isFlights) {
    if ((isRange && stops) || stops) return { ...stops, isDirect: false };
    if (direct) return { ...direct, isDirect: true };
  }
};

export const useFlightsData = (): FlightsData => {
  const {
    item: { flightPriceKey },
    flights,
  } = useCityContext();
  const isFlights = !!flights && !!flightPriceKey;
  const isDirectAvailable = !!flights?.directPrice;
  const isRange = isDirectAvailable && flights.directPrice > flights.stopsPrice;
  const direct: FlightsItem | undefined =
    isFlights && isDirectAvailable
      ? {
          price: flights.directPrice,
          duration: flights.directDuration,
          link: getLink(flightPriceKey, true),
        }
      : undefined;
  const stops: FlightsItem | undefined =
    isFlights && flights.stopsPrice
      ? {
          price: flights.stopsPrice,
          duration: flights.stopsDuration,
          link: getLink(flightPriceKey, false),
        }
      : undefined;

  return {
    cheapest: getCheapest(isFlights, isRange, direct, stops),
    isFlights,
    isDirectAvailable,
    isRange,
    direct,
    stops,
    get: (isDirect: boolean) => (isDirect ? direct : stops),
  } as FlightsData;
};
