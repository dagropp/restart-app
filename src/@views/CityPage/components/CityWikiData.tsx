import { City } from '@root/types';
import WikiData from '@shared/WikiData';
import { useCityContext } from '@views/CityPage/context';

const ratioMap: Record<City, number> = {
  [City.AMSTERDAM]: 600 / 400,
  [City.ATHENS]: 600 / 400,
  [City.AUCKLAND]: 600 / 360,
  [City.AUSTIN]: 600 / 234,
  [City.BARCELONA]: 600 / 262,
  [City.BASEL]: 600 / 246,
  [City.BENGALURU]: 600 / 188,
  [City.BERLIN]: 600 / 350,
  [City.BERN]: 600 / 233,
  [City.BOSTON]: 600 / 391,
  [City.BRATISLAVA]: 600 / 449,
  [City.BRISBANE]: 600 / 291,
  [City.BRUSSELS]: 600 / 360,
  [City.BUDAPEST]: 600 / 399,
  [City.CAMBRIDGE]: 600 / 400,
  [City.CHICAGO]: 600 / 424,
  [City.COPENHAGEN]: 600 / 296,
  [City.DENVER]: 600 / 399,
  [City.DUBAI]: 600 / 415,
  [City.DUBLIN]: 600 / 298,
  [City.EDINBURGH]: 600 / 338,
  [City.EINDHOVEN]: 600 / 399,
  [City.FRANKFURT]: 600 / 400,
  [City.GENEVA]: 600 / 461,
  [City.GLASGOW]: 600 / 381,
  [City.HAIFA]: 600 / 286,
  [City.HAMBURG]: 600 / 400,
  [City.HELSINKI]: 600 / 337,
  [City.JERUSALEM]: 600 / 450,
  [City.KRAKOW]: 600 / 295,
  [City.LARNACA]: 600 / 400,
  [City.LISBON]: 600 / 311,
  [City.LONDON]: 600 / 338,
  [City.LUXEMBOURG_CITY]: 600 / 399,
  [City.MADRID]: 600 / 316,
  [City.MANCHESTER]: 600 / 401,
  [City.MELBOURNE]: 600 / 400,
  [City.MILAN]: 600 / 281,
  [City.MONTREAL]: 600 / 318,
  [City.MUNICH]: 600 / 405,
  [City.NEW_YORK]: 600 / 337,
  [City.NICOSIA]: 600 / 338,
  [City.OSLO]: 600 / 375,
  [City.PARIS]: 600 / 375,
  [City.PRAGUE]: 600 / 357,
  [City.RIGA]: 600 / 395,
  [City.SANTA_CLARA]: 600 / 367,
  [City.SAN_FRANCISCO]: 1000 / 496,
  [City.SEATTLE]: 600 / 375,
  [City.STOCKHOLM]: 600 / 397,
  [City.SYDNEY]: 600 / 300,
  [City.TALLINN]: 600 / 400,
  [City.TEL_AVIV]: 600 / 296,
  [City.TORONTO]: 600 / 313,
  [City.VANCOUVER]: 600 / 337,
  [City.VIENNA]: 600 / 270,
  [City.VILNIUS]: 600 / 398,
  [City.WARSAW]: 600 / 361,
  [City.ZURICH]: 600 / 397,
  [City.UTRECHT]: 1000 / 563,
  [City.HAARLEM]: 1000 / 777,
  [City.POTSDAM]: 1000 / 667,
  [City.READING]: 1000 / 750,
  [City.ROTTERDAM]: 1000 / 666,
  [City.DEN_HAAG]: 1000 / 667,
  [City.LUGANO]: 1000 / 667,
  [City.CHRISTCHURCH]: 1000 / 684,
  [City.WELLINGTON]: 1000 / 400,
  [City.JERSEY_CITY]: 1000 / 457,
};

export const CityWikiData = () => {
  const { item } = useCityContext();

  return (
    <WikiData
      wikipediaKey={item.wikipediaKey}
      image={{
        path: `/assets/city-images/${item.id}.webp`,
        ratio: ratioMap[item.id],
      }}
    />
  );
};
