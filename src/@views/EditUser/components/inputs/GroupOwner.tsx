import TextField from '@common/TextField';
import { type UserResponse } from '@services/api';
import UserAvatar from '@shared/UserAvatar';

interface Props {
  user?: UserResponse;
}

const GroupOwner = ({ user }: Props) =>
  user && (
    <TextField
      slotProps={{
        input: {
          startAdornment: (
            <UserAvatar
              firstName={user.firstName}
              lastName={user.lastName}
              avatar={user.avatar}
              className="scale-75 mr-2"
            />
          ),
        },
      }}
      label="Group owner"
      value={`${user.firstName} ${user.lastName}`}
      disabled
      variant="outlined"
      fullWidth
    />
  );

export default GroupOwner;
