import Tooltip from '@common/Tooltip';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import { Country, Region, ValidRegion } from '@services/api';
import CountryDisplay from '@shared/CountryDisplay.tsx';
import MapElement from '@shared/MapElement';
import classes from '@views/Cities/components/WorldMap/styles.module.css';
import clsx from 'clsx';
import { useNavigate } from 'react-router';

interface Props {
  regions: ValidRegion[];
}

interface MarkProps {
  x: number;
  y: number;
  country: Country;
}

const regionMap = {
  [Region.ALL]: {
    scale: 1,
    translate: '0 0',
    strokeWidth: 0.7,
    marks: [
      { country: Country.AUSTRALIA, x: 90.6, y: 81.9 },
      { country: Country.AUSTRIA, x: 90.6, y: 81.9 },
      { country: Country.BELGIUM, x: 90.6, y: 81.9 },
      { country: Country.CANADA, x: 90.6, y: 81.9 },
      { country: Country.CYPRUS, x: 90.6, y: 81.9 },
      { country: Country.CZECH_REPUBLIC, x: 90.6, y: 81.9 },
      { country: Country.DENMARK, x: 90.6, y: 81.9 },
      { country: Country.ESTONIA, x: 90.6, y: 81.9 },
      { country: Country.FINLAND, x: 90.6, y: 81.9 },
      { country: Country.FRANCE, x: 90.6, y: 81.9 },
      { country: Country.GERMANY, x: 90.6, y: 81.9 },
      { country: Country.GREECE, x: 90.6, y: 81.9 },
      { country: Country.HUNGARY, x: 90.6, y: 81.9 },
      { country: Country.INDIA, x: 90.6, y: 81.9 },
      { country: Country.IRELAND, x: 90.6, y: 81.9 },
      { country: Country.ISRAEL, x: 90.6, y: 81.9 },
      { country: Country.ITALY, x: 90.6, y: 81.9 },
      { country: Country.LATVIA, x: 90.6, y: 81.9 },

      { country: Country.LITHUANIA, x: 50.9, y: 14.7 },
      { country: Country.LUXEMBOURG, x: 46.4, y: 19.1 },
      { country: Country.NETHERLANDS, x: 45.9, y: 15.9 },
      { country: Country.NEW_ZEALAND, x: 96.7, y: 85.9 },
      { country: Country.NORWAY, x: 46.6, y: 10.7 },
      { country: Country.POLAND, x: 49.4, y: 16.5 },
      { country: Country.PORTUGAL, x: 41.9, y: 26 },
      { country: Country.SLOVAKIA, x: 50.1, y: 18.9 },
      { country: Country.SPAIN, x: 43.3, y: 26 },
      { country: Country.SWEDEN, x: 48.4, y: 9.9 },
      { country: Country.SWITZERLAND, x: 46.7, y: 20.6 },
      { country: Country.UNITED_ARAB_EMIRATES, x: 61.8, y: 37.9 },
      { country: Country.UNITED_KINGDOM, x: 43.9, y: 16.3 },
      { country: Country.UNITED_STATES, x: 13.6, y: 26.9 },
    ],
  },
  [Region.EUROPE]: {
    scale: 3.9,
    translate: '-6% 117%',
    strokeWidth: 0.3,
    marks: [],
  },
  [Region.NORTH_AMERICA]: {
    scale: 2.9,
    translate: '100% 78%',
    strokeWidth: 0.4,
    marks: [],
  },
  [Region.ASIA]: {
    scale: 3,
    translate: '-50% 33%',
    strokeWidth: 0.4,
    marks: [],
  },
  [Region.OCEANIA]: {
    scale: 3.2,
    translate: '-129% -94%',
    strokeWidth: 0.4,
    marks: [],
  },
};

const Mark = ({ x, y, country }: MarkProps) => {
  const navigate = useNavigate();

  const popover = (
    <div
      className="p-2 flex flex-col items-center py-2 m-0 cursor-pointer hover:bg-gray-500"
      role="link"
      onClick={() => navigate('/countries/' + country)}
    >
      <CountryDisplay country={country} />
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

export const CountriesWorldMap = ({ regions }: Props) => {
  const mapRegion = regions.length === 1 ? regions[0] : Region.ALL;
  const { scale, translate, strokeWidth, marks } = regionMap[mapRegion];

  return (
    <div className="max-w-[1180px] mx-auto">
      <div className="relative">
        <MapElement
          className="w-full object-contain select-none stroke-[0.7]"
          style={{
            scale,
            strokeWidth,
            translate,
            transition: 'translate .3s, scale .3s, stroke-width .3s',
          }}
        />
        {marks.map((mark) => (
          <Mark key={`${mapRegion}-${mark.country}`} {...mark} />
        ))}
      </div>
    </div>
  );
};
