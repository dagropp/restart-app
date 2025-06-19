import { TableCellRenderer } from '@common/Table';
import Tooltip from '@common/Tooltip';
import { useUserContext } from '@context/user';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import IconButton from '@mui/material/IconButton';
import apiService, { City, Country, StatusResponse } from '@services/api';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import { style } from '@utils/style.utils';
import clsx from 'clsx';
import { type MouseEvent } from 'react';

interface BaseRow {
  id: City | Country;
  isBookmark: boolean;
  isDestination: boolean;
}

interface Props extends TableCellRenderer<BaseRow> {
  isAlwaysVisible?: boolean;
}

const getClassName = (
  isActive: boolean,
  isOtherActive: boolean,
  isAlwaysVisible?: boolean,
) =>
  clsx(
    'transition-opacity flex items-center gap-1',
    !isActive && !isAlwaysVisible && 'opacity-0 group-hover:opacity-100',
    isOtherActive &&
      !isActive &&
      !isAlwaysVisible &&
      '!hidden group-hover:!block',
  );

export const BookmarkCell = ({ row, isAlwaysVisible }: Props) => {
  const { group } = useUserContext();
  const translations = useTranslations().table.cells.favorites;

  const { refetch: refetchGroup } = apiService.useGroup(group.id);
  const { refetch: refetchCities } = apiService.useCities();
  const { refetch: refetchCountries } = apiService.countries.useList();
  const disabled = row.isDestination && group.destination !== row.id;

  const toggleBookmark = useMutation({
    mutationFn: () => apiService.toggleGroupBookmark(group.id, row.id),
  });

  const toggleDestination = useMutation({
    mutationFn: () => apiService.toggleGroupDestination(group.id, row.id),
  });

  const handleClick =
    (api: UseMutationResult<StatusResponse, Error, void>) =>
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const { status } = await api.mutateAsync();
      if (status) {
        refetchCities();
        refetchCountries();
        refetchGroup();
      }
    };

  const bookmarkIcon = <StarRoundedIcon sx={{ fill: '#faaf00' }} />;

  const destinationIcon = <FavoriteRoundedIcon color="error" />;

  const emptyBookmarkIcon = (
    <StarOutlineRoundedIcon
      sx={{ fill: (theme) => theme.palette.text.secondary }}
    />
  );

  const emptyDestinationIcon = (
    <FavoriteBorderRoundedIcon
      sx={{ fill: (theme) => theme.palette.text.secondary }}
    />
  );

  return (
    <div className="flex items-center justify-center gap-1 min-w-16 w-16">
      <Tooltip
        title={
          row.isBookmark
            ? translations.bookmark.remove
            : translations.bookmark.add
        }
        placement="left"
      >
        <IconButton
          onClick={handleClick(toggleBookmark)}
          size="small"
          className={getClassName(
            row.isBookmark,
            row.isDestination,
            isAlwaysVisible || !style.isHoverSupported,
          )}
        >
          {row.isBookmark ? bookmarkIcon : emptyBookmarkIcon}
        </IconButton>
      </Tooltip>
      {(row.isDestination || !disabled) && (
        <Tooltip
          title={
            disabled
              ? translations.destination.isDerived
              : row.isDestination
                ? translations.destination.remove
                : group.destination
                  ? translations.destination.replace
                  : translations.destination.add
          }
          placement="right"
        >
          <span className={clsx(disabled && 'opacity-75 cursor-not-allowed')}>
            <IconButton
              onClick={handleClick(toggleDestination)}
              size="small"
              className={getClassName(
                row.isDestination,
                row.isBookmark,
                isAlwaysVisible || !style.isHoverSupported,
              )}
              disabled={disabled}
            >
              {row.isDestination ? destinationIcon : emptyDestinationIcon}
            </IconButton>
          </span>
        </Tooltip>
      )}
    </div>
  );
};
