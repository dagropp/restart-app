import Avatar, { AvatarProps } from '@mui/material/Avatar';

interface Props extends Omit<AvatarProps, 'src' | 'children'> {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  loading?: boolean;
}

const getInitials = (...names: string[]) =>
  names
    .map((item) => item?.charAt(0))
    .join('')
    .toUpperCase();

const UserAvatar = ({
  avatar,
  firstName,
  lastName,
  loading,
  ...props
}: Props) =>
  loading ? (
    <Avatar {...props} />
  ) : (
    <Avatar src={avatar} {...props}>
      {firstName && lastName && getInitials(firstName, lastName)}
    </Avatar>
  );

export default UserAvatar;
