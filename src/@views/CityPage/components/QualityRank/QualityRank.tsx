import Rating from '@common/Rating';
import Typography from '@common/Typography';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { lighten, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import apiService, { type QualityIndexResponse } from '@services/api';
import { quality } from '@services/api/sections';
import SectionCard from '@shared/SectionCard';
import { useQuery } from '@tanstack/react-query';
import { useTranslations, useTranslationsContext } from '@translations';
import { is } from '@utils/is.utils.ts';
import { useCityContext } from '@views/CityPage/context';

type Key = keyof QualityIndexResponse;

interface SectionProps {
  id: Key;
  rank?: number;
  minRank?: number;
}

const getBgColor = (score: number, theme: Theme) => {
  if (score <= 1 / 3) return theme.palette.success.light;
  if (score <= 2 / 3) return theme.palette.warning.light;
  return theme.palette.error.light;
};

const Section = ({ id, rank, minRank }: SectionProps) => {
  const translations = useTranslations().enum.qualityOfLife;

  if (is.nullOrUndefined(rank) || is.nullOrUndefined(minRank)) return null;

  const score = rank / minRank;

  return (
    <>
      <Typography variant="body2" fontWeight={500}>
        {translations[id]}
      </Typography>
      <Typography variant="body2" dir="ltr">
        {rank + 1}/{minRank}
      </Typography>
      <Box
        className="appearance-none w-full min-w-2 h-2 rounded"
        style={{ width: `${100 - score * 100}%` }}
        sx={(theme) => ({
          bgcolor: lighten(getBgColor(score, theme), 0.2),
        })}
      />
    </>
  );
};

export const QualityRank = () => {
  const { item } = useCityContext();
  const translations = useTranslations().city.qualityRank;
  const { isRtl } = useTranslationsContext();
  const theme = useTheme();

  const { data: scores } = apiService.score.use();
  const rating = scores[item.id].qualityRank;

  const { data } = useQuery({
    queryKey: ['getQualityRank'],
    queryFn: () => quality.get(item.id),
  });

  if (is.emptyObject(data)) return null;

  const sorted: Key[] = ['quality', 'crime', 'pollution', 'health', 'traffic'];

  return (
    <SectionCard
      title={translations.title}
      TitleIcon={WorkspacePremiumRoundedIcon}
    >
      <div
        className="grid grid-cols-[max-content_max-content_1fr] gap-4 items-center"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {sorted.map((key) => {
          const { rank, minRank } = data[key] ?? {};
          return <Section key={key} id={key} rank={rank} minRank={minRank} />;
        })}
      </div>
      <div
        className="flex flex-col items-center justify-center mt-4 border-t pt-4"
        style={{ borderColor: theme.palette.divider }}
      >
        <Typography variant="body2" className="pb-1">
          {translations.average}
        </Typography>
        <Rating value={rating} base={10} readOnly size="large" />
        <Typography variant="h6" fontWeight={500}>
          {(rating / 2).toFixed(1)}
        </Typography>
      </div>
    </SectionCard>
  );
};
