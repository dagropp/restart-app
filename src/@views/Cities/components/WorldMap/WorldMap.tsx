import Rating from '@common/Rating';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import apiService, { City, CityData, Region } from '@services/api';
import CountryDisplay from '@shared/CountryDisplay';
import MapElement from '@shared/MapElement';
import { object } from '@utils/object.utils';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import classes from './styles.module.css';

interface MarkData {
  x: number;
  y: number;
  cities: City[];
}

interface MarkProps extends MarkData {
  data: CityData[];
}

interface RegionData {
  translate: string;
  scale: number;
  marks: MarkData[];
  label: string;
  strokeWidth: number;
}

interface Props {
  regions: Region[];
  filteredIds: Set<City>;
}

const regionMap: Record<Region, RegionData> = {
  [Region.ALL]: {
    scale: 1,
    translate: '0 0',
    label: 'All',
    strokeWidth: 0.7,
    marks: [
      // OCEANIA
      { x: 90.6, y: 81.9, cities: [City.SYDNEY] },
      { x: 88.5, y: 83.4, cities: [City.MELBOURNE] },
      { x: 92.8, y: 75.5, cities: [City.BRISBANE] },
      { x: 97.9, y: 82.6, cities: [City.AUCKLAND] },
      // ASIA
      { x: 69.7, y: 46, cities: [City.BENGALURU] },
      { x: 62, y: 36.6, cities: [City.DUBAI] },
      { x: 55.2, y: 31.2, cities: [City.TEL_AVIV, City.JERUSALEM, City.HAIFA] },
      // NORTH AMERICA
      { x: 9.2, y: 18.3, cities: [City.VANCOUVER] },
      { x: 8.9, y: 19.8, cities: [City.SEATTLE] },
      { x: 21.9, y: 24.8, cities: [City.NEW_YORK] },
      { x: 23.1, y: 23.5, cities: [City.BOSTON] },
      { x: 13.3, y: 33.8, cities: [City.AUSTIN] },
      { x: 6.9, y: 26.1, cities: [City.SAN_FRANCISCO] },
      { x: 20.8, y: 22.6, cities: [City.TORONTO] },
      { x: 22.7, y: 21, cities: [City.MONTREAL] },
      { x: 11.7, y: 24.5, cities: [City.DENVER] },
      { x: 18.2, y: 23.9, cities: [City.CHICAGO] },
      // EUROPE
      { x: 54.5, y: 28.9, cities: [City.NICOSIA, City.LARNACA] },
      { x: 51.5, y: 26.9, cities: [City.ATHENS] },
      { x: 45, y: 23.9, cities: [City.BARCELONA] },
      { x: 43.4, y: 25.5, cities: [City.MADRID] },
      { x: 47.2, y: 21.2, cities: [City.MILAN] },
      { x: 41.6, y: 26.3, cities: [City.LISBON] },
      { x: 43.1, y: 12.4, cities: [City.EDINBURGH, City.GLASGOW] },
      { x: 42.6, y: 15.5, cities: [City.DUBLIN] },
      {
        x: 45.7,
        y: 16.3,
        cities: [City.AMSTERDAM, City.EINDHOVEN, City.BRUSSELS],
      },
      {
        x: 45.5,
        y: 21.5,
        cities: [City.LONDON, City.CAMBRIDGE, City.MANCHESTER],
      },
      { x: 51.2, y: 14.5, cities: [City.VILNIUS] },
      { x: 46.1, y: 18.1, cities: [City.LUXEMBOURG_CITY] },
      { x: 49.2, y: 18.9, cities: [City.BRATISLAVA, City.VIENNA] },
      { x: 50, y: 19.7, cities: [City.BUDAPEST] },
      { x: 48.5, y: 17.8, cities: [City.PRAGUE] },
      { x: 50.3, y: 17.3, cities: [City.WARSAW, City.KRAKOW] },
      { x: 49.1, y: 11, cities: [City.STOCKHOLM] },
      { x: 47, y: 11, cities: [City.OSLO] },
      { x: 47.8, y: 13.7, cities: [City.COPENHAGEN] },
      { x: 50.9, y: 10.8, cities: [City.HELSINKI, City.TALLINN] },
      { x: 44.9, y: 18.9, cities: [City.PARIS] },
      { x: 48, y: 15.9, cities: [City.BERLIN, City.HAMBURG] },
      { x: 47.6, y: 19, cities: [City.FRANKFURT, City.MUNICH] },
      {
        x: 46.7,
        y: 20.2,
        cities: [City.ZURICH, City.BERN, City.BASEL, City.GENEVA],
      },
    ],
  },
  [Region.EUROPE]: {
    scale: 3.6,
    translate: '-3% 109%',
    label: 'Europe',
    strokeWidth: 0.3,
    marks: [
      { x: 65.8, y: 92, cities: [City.NICOSIA, City.LARNACA] },
      { x: 54.9, y: 84.1, cities: [City.ATHENS] },
      { x: 31.4, y: 75, cities: [City.BARCELONA] },
      { x: 25.2, y: 78.5, cities: [City.MADRID] },
      { x: 38.4, y: 64.2, cities: [City.MILAN] },
      { x: 19, y: 82.5, cities: [City.LISBON] },
      { x: 26.4, y: 36.7, cities: [City.EDINBURGH] },
      { x: 25.1, y: 37.4, cities: [City.GLASGOW] },
      { x: 22.9, y: 43.1, cities: [City.DUBLIN] },
      { x: 33.8, y: 44.6, cities: [City.AMSTERDAM] },
      { x: 34.7, y: 48.3, cities: [City.EINDHOVEN] },
      { x: 33.7, y: 50.6, cities: [City.BRUSSELS] },
      { x: 29.7, y: 47.8, cities: [City.LONDON, City.CAMBRIDGE] },
      { x: 26.8, y: 42.5, cities: [City.MANCHESTER] },
      { x: 35.3, y: 53, cities: [City.LUXEMBOURG_CITY] },
      { x: 46.6, y: 56.8, cities: [City.BRATISLAVA, City.VIENNA] },
      { x: 48.7, y: 58.9, cities: [City.BUDAPEST] },
      { x: 44, y: 52.2, cities: [City.PRAGUE] },
      { x: 46.1, y: 29, cities: [City.STOCKHOLM] },
      { x: 39.4, y: 27.4, cities: [City.OSLO] },
      { x: 41.5, y: 37.5, cities: [City.COPENHAGEN] },
      { x: 52, y: 26, cities: [City.HELSINKI] },
      { x: 51.9, y: 28.6, cities: [City.TALLINN] },
      { x: 31.7, y: 54.9, cities: [City.PARIS] },
      { x: 42.4, y: 45.6, cities: [City.BERLIN] },
      { x: 38.6, y: 42.6, cities: [City.HAMBURG] },
      { x: 41.3, y: 57, cities: [City.MUNICH] },
      { x: 37.6, y: 52, cities: [City.FRANKFURT] },
      { x: 38, y: 59.7, cities: [City.ZURICH] },
      { x: 37.2, y: 58.2, cities: [City.BASEL] },
      { x: 36.5, y: 60.2, cities: [City.BERN] },
      // fixed
      { x: 51, y: 46.4, cities: [City.WARSAW] },
      { x: 49.7, y: 52.1, cities: [City.KRAKOW] },
      { x: 54.4, y: 40.8, cities: [City.VILNIUS] },
      { x: 35.9, y: 62.1, cities: [City.GENEVA] },
    ],
  },
  [Region.NORTH_AMERICA]: {
    scale: 2.9,
    translate: '100% 78%',
    label: 'North America',
    strokeWidth: 0.4,
    marks: [
      { x: 74.2, y: 58.1, cities: [City.BOSTON] },
      { x: 71.2, y: 60.6, cities: [City.NEW_YORK] },
      { x: 33.2, y: 42.5, cities: [City.VANCOUVER] },
      { x: 33.1, y: 45.3, cities: [City.SEATTLE] },
      { x: 45.3, y: 86.8, cities: [City.AUSTIN] },
      { x: 26.7, y: 65.6, cities: [City.SAN_FRANCISCO] },
      { x: 67.3, y: 54.4, cities: [City.TORONTO] },
      { x: 72.7, y: 50.8, cities: [City.MONTREAL] },
      { x: 40.5, y: 62, cities: [City.DENVER] },
      { x: 59.5, y: 58.5, cities: [City.CHICAGO] },
    ],
  },
  [Region.ASIA]: {
    scale: 3,
    translate: '-50% 33%',
    label: 'Asia and Middle-East',
    strokeWidth: 0.4,
    marks: [
      { x: 60.7, y: 79, cities: [City.BENGALURU] },
      { x: 38, y: 48.2, cities: [City.DUBAI] },
      { x: 17.5, y: 34.1, cities: [City.TEL_AVIV, City.JERUSALEM] },
      { x: 17.6, y: 31.3, cities: [City.HAIFA] },
      { x: 15.6, y: 26.7, cities: [City.NICOSIA, City.LARNACA] },
      { x: 6.5, y: 19.9, cities: [City.ATHENS] },
    ],
  },
  [Region.OCEANIA]: {
    scale: 3.2,
    translate: '-129% -94%',
    label: 'Oceania',
    strokeWidth: 0.4,
    marks: [
      { x: 53.9, y: 63.7, cities: [City.SYDNEY] },
      { x: 46.4, y: 70.8, cities: [City.MELBOURNE] },
      { x: 60.3, y: 44.8, cities: [City.BRISBANE] },
      { x: 76.6, y: 68.7, cities: [City.AUCKLAND] },
    ],
  },
};

const Mark = ({ x, y, cities, data }: MarkProps) => {
  const navigate = useNavigate();
  const { data: scores } = apiService.score.use();

  const popover = (
    <div>
      {cities.map((city) => {
        const item = data.find((c) => c.id === city);

        if (!item) return null;

        return (
          <div
            key={city}
            className="p-2 flex flex-col items-center border-b border-solid border-gray-400 py-2 last:border-none last:m-0 cursor-pointer hover:bg-gray-500"
            role="link"
            onClick={() => navigate('/city/' + item.id)}
          >
            <Typography variant="subtitle2" className="pb-2">
              {item.name}
              {item.state && `, ${item.state}`}
            </Typography>
            <CountryDisplay country={item.country.id} />
            <Rating
              value={scores[city].average}
              base={10}
              readOnly
              className="pt-2 scale-75"
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <Tooltip title={popover}>
      <RoomRoundedIcon
        style={{ left: `${x}%`, top: `${y}%` }}
        className={clsx(
          'shadow-2xl absolute opacity-80 cursor-pointer !transition-transform hover:scale-125 h-5',
          classes.marker,
        )}
      />
    </Tooltip>
  );
};

const getDefaultRegion = (
  filteredIds: Set<City>,
  data?: Record<City, CityData>,
) => {
  if (!data) return Region.ALL;
  const regions = Array.from(
    new Set(
      object
        .values(data)
        .filter(({ id }) => filteredIds.has(id))
        .flatMap((i) => i.country.regions),
    ),
  );
  return regions.length === 1 ? regions[0] : Region.ALL;
};

export const WorldMap = ({ regions, filteredIds }: Props) => {
  const { data } = apiService.useCities();
  const mapRegion =
    regions.length === 1 ? regions[0] : getDefaultRegion(filteredIds, data);
  const { scale, translate, strokeWidth, marks } = regionMap[mapRegion];

  const filtered = useMemo(
    () =>
      marks
        .map((mark) => {
          const cities = mark.cities.filter((city) => filteredIds.has(city));
          return { ...mark, cities };
        })
        .filter((mark) => mark.cities.length),
    [filteredIds, marks],
  );

  return (
    <div className="max-w-[1180px] mx-auto">
      <div className="relative">
        <MapElement
          className="w-full object-contain select-none"
          style={{
            scale,
            translate,
            strokeWidth,
            transition: 'translate .3s, scale .3s, stroke-width .3s',
          }}
        />
        {filtered.map((props) => (
          <Mark
            key={`${mapRegion}-${props.cities.join(',')}`}
            data={object.values(data ?? {})}
            {...props}
          />
        ))}
      </div>
    </div>
  );
};
