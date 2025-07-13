import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import SwitchLeftRoundedIcon from '@mui/icons-material/SwitchLeftRounded';
import SwitchRightRoundedIcon from '@mui/icons-material/SwitchRightRounded';
import IconButton from '@mui/material/IconButton';
import dateService from '@services/date.service';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';
import { convertCurrency, formatCurrency } from '@utils/format.utils';
import clsx from 'clsx';
import { cloneElement, JSX, useEffect, useState } from 'react';

import { useCityContext } from '../context';
import { useFlightsData } from '../hooks';
import classes from './flight-time.module.css';

interface LineProps {
  icon: JSX.Element;
  time: number;
  isDirect?: boolean;
}

const Line = ({ icon, time, isDirect = true }: LineProps) => {
  const Icon = cloneElement(icon, {
    className: clsx(
      icon.props.className,
      'absolute left-1/2 -ml-[10px] z-10 mt-[1px]',
    ),
  });

  const Bar = (
    <div className={clsx('relative w-full h-4 flex items-center', classes.bar)}>
      <div className="w-full relative h-1 bg-blue-200 opacity-50 rounded-xl" />
      {Icon}
    </div>
  );

  return (
    <div className="max-w-full flex flex-col gap-2 items-center justify-center w-[80px]">
      <div className={clsx('flex w-full', !isDirect && classes.barDouble)}>
        {!isDirect && Bar}
        {Bar}
      </div>
      <Typography variant="subtitle2">
        {dateService.getTimeByMinutes(time)}
      </Typography>
    </div>
  );
};

const FlightData = () => {
  const { currencies, currency: ctxCurrency } = useAppContext();
  const { item } = useCityContext();
  const { isDirectAvailable, isRange, get } = useFlightsData();
  const translations = useTranslations().city.flight;
  const [isDirect, setIsDirect] = useState(isDirectAvailable);

  useEffect(() => {
    setIsDirect(isDirectAvailable);
  }, [isDirectAvailable]);

  const flight = get(isDirect);
  const currencyConverter = convertCurrency(
    currencies,
    ctxCurrency,
    item.country.currency,
  );

  if (!flight) return null;

  return (
    <SectionCard
      title={
        <div className="flex items-center  justify-center">
          {translations.title}
          {isRange && (
            <IconButton
              color="inherit"
              onClick={() => setIsDirect((prev) => !prev)}
            >
              {isDirect ? (
                <SwitchRightRoundedIcon fontSize="small" />
              ) : (
                <SwitchLeftRoundedIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </div>
      }
      TitleIcon={FlightTakeoffRoundedIcon}
    >
      <div className="flex flex-col items-center pb-5 gap-1">
        <div className="flex items-center gap-2">
          <Typography>
            {formatCurrency(flight.price, item.country.currency, true)}
          </Typography>
          <AirplaneTicketRoundedIcon fontSize="small" />
        </div>
        {ctxCurrency !== item.country.currency && (
          <Typography variant="caption">
            {currencyConverter?.(flight.price, true)}
          </Typography>
        )}
      </div>

      <div className="flex justify-center gap-2 text-center items-start">
        <Typography variant="subtitle2" lineHeight="normal">
          {translations.city}
        </Typography>
        <Line icon={<AirportShuttleRoundedIcon />} time={item.driveDuration} />
        <Typography variant="subtitle2">
          <div>{item.airport}</div>
          <Typography variant="caption">{translations.airport}</Typography>
        </Typography>
        <Line
          icon={<FlightRoundedIcon className="rotate-90" />}
          time={flight.duration}
          isDirect={isDirect}
        />
        <Typography variant="subtitle2">
          <div>TLV</div>
          <Typography variant="caption">{translations.airport}</Typography>
        </Typography>
      </div>
    </SectionCard>
  );
};

export default FlightData;
