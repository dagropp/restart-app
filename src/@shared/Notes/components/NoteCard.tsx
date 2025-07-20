import CloneElement from '@common/CloneElement';
import Dialog from '@common/Dialog';
import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useUserContext } from '@context/user';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import { Theme } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import { SxProps } from '@mui/system';
import { NoteType } from '@root/types';
import apiService, { type NoteResponse } from '@services/api';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { string } from '@utils/string.utils';
import clsx from 'clsx';
import { type MouseEvent, useMemo, useState } from 'react';

import UserAvatar from '../../UserAvatar';
import { EditNoteDialog } from './EditNoteDialog';
import { NoteCardSubheader } from './NoteCardSubheader';
import { NoteEditor } from './NoteEditor';
import { NoteData, NoteForm } from './NoteForm';
import { NoteLink } from './NoteLink';
import { TextNote } from './TextNote';

interface Props {
  note: NoteResponse;
  refetch: () => void;
  showCity?: boolean;
  fullPage?: boolean;
}

interface NoteCardSkeletonProps {
  rows: number;
}

export const NoteCardSkeleton = ({ rows }: NoteCardSkeletonProps) => {
  const translations = useTranslations().notes;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<UserAvatar loading />}
        action={
          <IconButton disabled>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Skeleton variant="text" width={100} />}
        subheader={
          <div className="flex items-center gap-2">
            <Skeleton variant="text" width={150} />
          </div>
        }
      />
      <CardContent>
        <CloneElement times={rows - 1}>
          <Skeleton variant="text" />
        </CloneElement>
        <Skeleton variant="text" width="50%" />
      </CardContent>
      <CardActions disableSpacing>
        <div className="flex items-center w-full justify-between gap-2">
          <div className="flex items-center gap-1">
            <IconButton disabled>
              <PushPinOutlinedIcon />
            </IconButton>
            <IconButton disabled>
              <CommentRoundedIcon />
            </IconButton>
          </div>
          <Typography
            variant="subtitle2"
            color="textDisabled"
            className="flex items-center gap-1"
          >
            {translations.noComments}
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
};

export const NoteCard = ({ note, refetch, showCity, fullPage }: Props) => {
  const { data: users = {} } = apiService.users.use();
  const translations = useTranslations().notes;
  const { isRtl } = useTranslationsContext();

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(!!fullPage);

  const { data: replies = [], refetch: refetchReplies } =
    apiService.notes.useReplies(
      note.id,
      isCommentsExpanded && note.replies > 0,
    );

  const { id: userId } = useUserContext().user;
  const noteUser = users[note.userId] ?? {
    firstName: '',
    lastName: '',
    email: '',
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    handleCloseUserMenu();
  };
  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
    handleCloseUserMenu();
  };
  const handleCloseEditDialog = () => setIsEditDialogOpen(false);

  const toggleReplies = () => setIsCommentsExpanded((prev) => !prev);

  const handleDelete = async () => {
    await apiService.notes.delete(note.id);
    handleCloseDeleteDialog();
    refetch();
  };

  const handleReply = async ({ note: value }: NoteData) => {
    const { status } = await apiService.notes.reply(note.id, value);
    if (status) {
      await refetchReplies();
      refetch();
    }
  };

  const handlePin = async () => {
    const newValue = !note.pinned;
    const { status } = await apiService.notes.pin(note.id, newValue);
    if (status) refetch();
  };

  const commentsCounter = !note.replies
    ? translations.noComments
    : note.replies === 1
      ? translations.commentSingle
      : interpolateTranslations(translations.commentsCount, {
          comments: note.replies,
        });

  const menuItems = [
    {
      label: translations.edit.title,
      Icon: EditRoundedIcon,
      action: handleOpenEditDialog,
    },
    {
      label: translations.delete.title,
      Icon: DeleteRoundedIcon,
      action: handleOpenDeleteDialog,
    },
  ];

  const isOwner = note.userId === userId;
  const isReply = !!note.parent;

  const styling: SxProps<Theme> = useMemo(() => {
    if (isReply) {
      return {
        border: 'none',
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        ':first-of-type': { borderTop: 'none' },
      };
    }
    if (fullPage) {
      return { border: 'none' };
    }
    return {};
  }, [fullPage, isReply]);

  const repliesDisplay = fullPage ? replies : replies.slice(0, 5);

  const isHebrewTitle = !!note.title && string.containsHebrew(note.title);

  const handleReplyChange = async () => {
    refetch();
    await refetchReplies();
  };

  return (
    <>
      <Card variant="outlined" sx={styling}>
        <CardHeader
          avatar={
            <div className="flex items-center gap-2">
              <UserAvatar
                firstName={noteUser.firstName}
                lastName={noteUser.lastName}
                avatar={noteUser.avatar}
              />
            </div>
          }
          action={
            <div>
              {isOwner && (
                <IconButton onClick={handleOpenUserMenu}>
                  <MoreVertIcon />
                </IconButton>
              )}
              {!fullPage && !note.parent && (
                <Tooltip title={translations.fullPageView}>
                  <IconButton
                    component={Link}
                    href={String(note.id)}
                    color="primary"
                  >
                    <LaunchRoundedIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          }
          title={`${noteUser.firstName} ${noteUser.lastName}`}
          subheader={
            <NoteCardSubheader
              note={note}
              showCity={showCity}
              isReply={isReply}
            />
          }
        />
        <CardContent>
          {note.title && (
            <Typography
              variant="subtitle1"
              className="pb-2"
              dir={isHebrewTitle ? 'rtl' : 'ltr'}
              align={isHebrewTitle ? 'right' : 'left'}
            >
              <strong>{note.title}</strong>
            </Typography>
          )}
          {note.type === NoteType.Note && (
            <TextNote note={note} fullPage={fullPage} />
          )}
          {note.type === NoteType.Link && (
            <NoteLink link={note.data} fullPage={fullPage} />
          )}
        </CardContent>
        {!isReply && (
          <>
            <CardActions disableSpacing>
              <div className="flex items-center w-full justify-between gap-2 pr-2">
                <div className="flex items-center gap-1">
                  <Tooltip
                    title={
                      note.pinned ? translations.removePin : translations.pin
                    }
                  >
                    <IconButton onClick={handlePin}>
                      {note.pinned ? (
                        <PushPinRoundedIcon />
                      ) : (
                        <PushPinOutlinedIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  {!fullPage && (
                    <Tooltip title={translations.comments}>
                      <IconButton onClick={toggleReplies}>
                        <CommentRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className="flex items-center gap-1"
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  {fullPage ? (
                    commentsCounter
                  ) : (
                    <Link onClick={toggleReplies}>{commentsCounter}</Link>
                  )}
                </Typography>
              </div>
            </CardActions>
            <Collapse in={isCommentsExpanded} timeout="auto" unmountOnExit>
              <CardContent
                className={clsx('border-t', replies.length && '!pb-0')}
                sx={{ borderColor: (theme) => theme.palette.divider }}
              >
                <NoteForm onSave={handleReply} className="w-full">
                  <NoteEditor
                    autoFocus={!fullPage}
                    size="small"
                    variant="reply"
                  />
                </NoteForm>
                {repliesDisplay.map((note) => (
                  <NoteCard
                    key={`reply-${note.id}`}
                    note={note}
                    refetch={handleReplyChange}
                    fullPage={fullPage}
                  />
                ))}
                {repliesDisplay.length < replies.length && (
                  <div className="p-4">
                    <Link href={String(note.id)}>
                      <Typography variant="body2">
                        {translations.showMore}
                      </Typography>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Collapse>
          </>
        )}
      </Card>
      {isOwner && (
        <>
          <Menu
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 48, horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!anchorElUser}
            onClose={handleCloseUserMenu}
          >
            {menuItems.map(({ label, action, Icon }) => (
              <MenuItem key={label} onClick={action}>
                <div className="flex items-center justify-between gap-4 w-full">
                  <Typography variant="body2">{label}</Typography>
                  <Icon fontSize="small" />
                </div>
              </MenuItem>
            ))}
          </Menu>

          <Dialog
            open={isDeleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            success={{ onAction: handleDelete }}
          >
            {translations.delete.dialog}
          </Dialog>

          <EditNoteDialog
            open={isEditDialogOpen}
            onClose={handleCloseEditDialog}
            note={note}
            refetch={refetch}
          />
        </>
      )}
    </>
  );
};
