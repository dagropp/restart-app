import Typography from '@common/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import IconButton from '@mui/material/IconButton';
import { ScrapingType } from '@services/api';
import titleService from '@services/title';
import { scrapingTypeMap } from '@views/DataCenter/utils';
import { useLayoutEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import {
  CommunityData,
  CostOfLivingData,
  CurrenciesData,
  FlightsData,
  IncomeLevelsData,
  QualityOfLifeData,
} from './components';

const getComponent = (type?: ScrapingType) => {
  switch (type) {
    case ScrapingType.Community:
      return <CommunityData />;
    case ScrapingType.Currencies:
      return <CurrenciesData />;
    case ScrapingType.Flights:
      return <FlightsData />;
    case ScrapingType.IncomeLevels:
      return <IncomeLevelsData />;
    case ScrapingType.QualityOfLife:
      return <QualityOfLifeData />;
    case ScrapingType.CostOfLiving:
      return <CostOfLivingData />;
  }
};

const DataCenterItem = () => {
  const { type } = useParams<{ type: ScrapingType }>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const back = () => {
    const url = pathname?.split('/').slice(0, -1).join('/');
    navigate(url);
  };

  const title = type && scrapingTypeMap[type];

  useLayoutEffect(() => {
    titleService.setTitle('Settings', 'Data Center', title);
  }, [title]);

  return (
    <div className="px-5 flex flex-col items-start gap-2 w-full h-[calc(100vh-68px)]">
      <div className="flex items-center gap-2 mt-4">
        <IconButton onClick={back}>
          <ChevronLeftRoundedIcon />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </div>

      <div className="w-full flex-1 overflow-y-auto">{getComponent(type)}</div>
    </div>
  );
};

export default DataCenterItem;
