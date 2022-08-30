/* 
  Custom react hook for creating form state with validation
  https://felixgerschau.com/react-hooks-form-validation-typescript

  @param {Object} options for validation

  @returns Object {
    handleSubmit: handles form submission
    handleChange: handles input changes
    data: access to the form data
    errors: includes the errors to show
    validateInput: check if data is invalid by checking key on errors object
    resetForm: includes the errors to show
  }
*/

import { ChangeEvent, FormEvent, useState } from 'react';

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean; // eslint-disable-line
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <
  T extends Partial<Record<keyof T, any>> = {}
>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  // extend unknown so we can add a generic to an arrow function
  const handleChange =
    <S extends unknown>(
      key: keyof T,
      sanitizeFn?: (value: string) => S // eslint-disable-line
    ) =>
    (
      e: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>
    ) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;

      setData({
        ...data,
        [key]: value
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validations = options?.validations;

    if (validations) {
      let valid = true;

      const newErrors: ErrorRecord<T> = {};

      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;

        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;

        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);

        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  // validate input by checking if errors object is not empty
  const validateInput = (key: string) => {
    return errors.hasOwnProperty(key);
  };

  const resetForm = (key?: string) => {
    if (key) {
      setData({ ...data, [key]: '' });

      const newError: any = errors;

      // remove property to ensure not detected when validating errors object
      delete newError[key];

      setErrors({ ...errors });
    } else {
      setData((options?.initialValues || {}) as T);

      setErrors({});
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    validateInput
  };
};
