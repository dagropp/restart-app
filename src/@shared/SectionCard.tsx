import { Theme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import clsx from 'clsx';
import { type CSSProperties, type ReactNode } from 'react';

interface CardMedia {
  src: string;
  height: number;
}

interface Props {
  title?: ReactNode;
  subtitle?: ReactNode;
  TitleIcon?: OverridableComponent<SvgIconTypeMap>;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  theme?: 'light' | 'dark';
  style?: CSSProperties;
  media?: CardMedia;
}

const SectionCard = ({
  title,
  subtitle,
  TitleIcon,
  children,
  className,
  contentClassName,
  theme = 'light',
  style,
  media,
}: Props) => {
  const headerSx =
    theme === 'dark'
      ? (theme: Theme) => ({
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.text.primary
              : theme.palette.primary.contrastText,
        })
      : {};
  return (
    <Card
      variant="outlined"
      className={clsx('w-full max-w-full', className)}
      sx={
        theme === 'dark'
          ? (theme) =>
              theme.palette.mode === 'dark'
                ? {
                    bgcolor: theme.palette.action.selected,
                    borderColor: theme.palette.action.selected,
                  }
                : {
                    color: theme.palette.primary.contrastText,
                    bgcolor: theme.palette.text.primary,
                  }
          : {}
      }
      style={style}
    >
      {media && (
        <CardMedia
          image={media.src}
          sx={{
            height: media.height,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.action.selected
                : theme.palette.text.primary,
          }}
        />
      )}
      {(title || subtitle) && (
        <CardHeader
          title={
            <div className="flex gap-2 items-center justify-center">
              {title}
              {TitleIcon && <TitleIcon fontSize="small" />}
            </div>
          }
          slotProps={{
            title: { variant: 'h6', className: 'text-center', sx: headerSx },
            subheader: {
              variant: 'subtitle2',
              className: 'text-center',
              sx: headerSx,
            },
          }}
          subheader={subtitle}
        />
      )}

      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
};

export default SectionCard;
