import { UseControllerProps, ValidationRule } from 'react-hook-form';
import { EMAIL_REGEX } from '@/common/utils/email.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatorCreator = (...args: any[]) => UseControllerProps['rules'];

export const emailValidator = ((
  message = 'Please enter a valid email address',
) => ({
  pattern: {
    value: EMAIL_REGEX,
    message,
  },
})) satisfies ValidatorCreator;

export const requiredValidator = ((
  value: string | ValidationRule<boolean> = true,
) => ({
  required: value,
})) satisfies ValidatorCreator;

export const minLengthValidator = ((value: number) => ({
  minLength: {
    value,
    message: `Use at least ${value} characters`,
  },
})) satisfies ValidatorCreator;

export const maxLengthValidator = ((value: number) => ({
  maxLength: {
    value,
    message: `Use at most ${value} characters`,
  },
})) satisfies ValidatorCreator;
