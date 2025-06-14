import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { type FormProps } from './types';

const Form = <T extends object>({
  onSubmit,
  resetOnSubmit = true,
  ...props
}: FormProps<T>) => {
  const hook = useForm<T>();
  const { handleSubmit, reset } = hook;

  const handleFormSubmit = (data: FieldValues) => {
    onSubmit(data as T);
    if (resetOnSubmit) reset();
  };

  return (
    <FormProvider {...hook}>
      <form onSubmit={handleSubmit(handleFormSubmit)} {...props} />
    </FormProvider>
  );
};

export default Form;
