import { HTMLAttributes } from 'react';
import avatar from '../../../../coomon/assets/images/user_avatar.png';

export type UserAvatarProps = Omit<
  HTMLAttributes<HTMLImageElement>,
  'src' | 'alt'
>;

const UserAvatar = (props: UserAvatarProps) => {
  return <img src={avatar} alt="avatar" width={40} height={40} {...props} />;
};

export default UserAvatar;
