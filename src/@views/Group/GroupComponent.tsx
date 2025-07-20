import { useUserContext } from '@context/user';
import Masonry from '@mui/lab/Masonry';
import { style } from '@utils/style.utils';

import {
  ChildrenDisplay,
  GroupDisplay,
  ProgressWidget,
  TopWidget,
  UserDisplay,
} from './components';

const GroupComponent = () => {
  const {
    user,
    group: { partner, children },
  } = useUserContext();

  const hasChildren = children.length > 0;
  const columns =
    hasChildren || style.MASONRY_COLUMN_COUNT <= 2
      ? style.MASONRY_COLUMN_COUNT
      : style.MASONRY_COLUMN_COUNT - 1;

  return (
    <div className="pt-5 flex flex-col gap-4">
      <div className="px-5 flex flex-col gap-4 md:max-h-[375px] md:flex-row">
        <ProgressWidget />
        <TopWidget />
      </div>
      <div className="pl-5 pr-1 flex items-center gap-4">
        <Masonry columns={columns} spacing={2} sequential={false}>
          <UserDisplay user={user} editLink="/settings/user" />
          {partner && <UserDisplay user={partner} />}
          <GroupDisplay />
          {hasChildren && <ChildrenDisplay />}
        </Masonry>
      </div>
    </div>
  );
};

export default GroupComponent;
