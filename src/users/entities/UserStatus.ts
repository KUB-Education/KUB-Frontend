import { User } from '@/users/entities/User.ts';

export enum UserStatus {
  EMAIL_SENDING_FAILURE = 'EMAIL_SENDING_FAILURE',
  ACTIVATION_PENDING = 'ACTIVATION_PENDING',
  ACTIVATION_EXPIRED = 'ACTIVATION_EXPIRED',
  ACTIVATED = 'ACTIVATED',
  RECOVERY_PENDING = 'RECOVERY_PENDING',
}

export const userStatuses: UserStatus[] = Object.values(UserStatus);

const userStatusLabelsMap: Record<UserStatus, string> = {
  [UserStatus.EMAIL_SENDING_FAILURE]: 'Email sending failure',
  [UserStatus.ACTIVATION_PENDING]: 'Activation pending',
  [UserStatus.ACTIVATION_EXPIRED]: 'Activation expired',
  [UserStatus.ACTIVATED]: 'Activated',
  [UserStatus.RECOVERY_PENDING]: 'Recovering pending',
};

export const getUserStatusLabel = (status: UserStatus) => {
  return userStatusLabelsMap[status] ? userStatusLabelsMap[status] : 'Unknown';
};

export const isUserEmailSendingFailure = (user: User) => {
  return user.status === UserStatus.EMAIL_SENDING_FAILURE;
};
