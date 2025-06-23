import Link from '@common/Link';
import Typography from '@common/Typography';
import { useUserContext } from '@context/user';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type SvgIconTypeMap } from '@mui/material/SvgIcon';
import SectionCard from '@shared/SectionCard';
import { incomeUtils } from '@utils/income.utils';
import { useCityContext } from '@views/CityPage/context';

interface LinkData {
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  url: string;
  hidden?: boolean;
}

const Item = ({ label, Icon, url }: LinkData) => (
  <li className="list-none flex items-center gap-4">
    <Icon fontSize="small" />
    <Link href={url} external>
      <Typography variant="body2">{label}</Typography>
    </Link>
  </li>
);

export const CityLinks = () => {
  const { item } = useCityContext();
  const { user, group } = useUserContext();

  const userIncomeTypeData = incomeUtils.typeMap[user.income];
  const partnerIncomeTypeData =
    group.partner && incomeUtils.typeMap[group.partner.income];

  const list: LinkData[] = [
    {
      label: 'Cost of Living',
      url: `https://www.numbeo.com/cost-of-living/in/${item.costOfLivingKey}`,
      Icon: PointOfSaleRoundedIcon,
    },
    {
      label: `${user.firstName}'s Income Data`,
      url: userIncomeTypeData?.getLink?.(item) ?? '',
      Icon: BusinessCenterRoundedIcon,
      hidden: !userIncomeTypeData?.getLink,
    },
    {
      label: `${group.partner?.firstName}'s Income Data`,
      url: partnerIncomeTypeData?.getLink?.(item) ?? '',
      Icon: Groups2RoundedIcon,
      hidden: !partnerIncomeTypeData?.getLink,
    },
    {
      label: 'Facebook Community',
      url: `https://www.facebook.com/groups/${item.communityKey}`,
      Icon: FacebookRoundedIcon,
      hidden: !item.communityKey,
    },
    {
      label: 'Flight Data',
      url: `https://www.kiwi.com/en/search/results/tel-aviv-israel/${item.flightPriceKey}`,
      Icon: FlightTakeoffRoundedIcon,
      hidden: !item.flightPriceKey,
    },
    {
      label: 'Wikipedia Page',
      url: `https://en.wikipedia.org/wiki/${item.wikipediaKey}`,
      Icon: LibraryBooksRoundedIcon,
    },
  ];

  return (
    <SectionCard title="External Links" TitleIcon={PublicRoundedIcon}>
      <ul className="flex flex-col gap-2">
        {list
          .filter((item) => !item.hidden)
          .map((item) => (
            <Item key={item.label} {...item} />
          ))}
      </ul>
    </SectionCard>
  );
};
