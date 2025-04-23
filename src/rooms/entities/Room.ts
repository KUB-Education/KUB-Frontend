import {
  maxLengthValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';

export type RoomId = number;

export type Room = {
  id: RoomId;
  location: string;
  capacity: number;
};

export const roomLocationValidator = {
  ...requiredValidator(),
  ...maxLengthValidator(256),
};

export const roomCapacityValidator = {
  ...requiredValidator(),
  validate: (value?: number) =>
    Number(value) >= 1 ? true : 'Capacity must be at least 1',
};
