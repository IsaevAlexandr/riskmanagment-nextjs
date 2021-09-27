import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { Field, FieldMetaState, FieldProps, FieldRenderProps } from 'react-final-form';

export type ShowErrorFunc<T> = (props: ShowErrorProps<T>) => boolean;

export type TextFieldProps<T> = Partial<Omit<MuiTextFieldProps, 'onChange'>> & {
  name: string;
  fieldProps?: Partial<FieldProps<T, any>>;
  showError?: ShowErrorFunc<T>;
};
export interface ShowErrorProps<T> {
  meta: FieldMetaState<T>;
}

export function showErrorOnChange<T>({
  meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}: ShowErrorProps<T>) {
  return !!(((submitError && !dirtySinceLastSubmit) || error) && (touched || modified));
}

type TextWrapperProps = FieldRenderProps<MuiTextFieldProps>;

export function TextFieldWrapper(props: TextWrapperProps) {
  const {
    input: { name, value, type, onChange, onBlur, onFocus, ...restInput },
    meta,
    required,
    fullWidth = true,
    helperText,
    showError = showErrorOnChange,
    ...rest
  } = props;

  const { error, submitError } = meta;
  const isError = showError({ meta });

  return (
    <MuiTextField
      fullWidth={fullWidth}
      helperText={isError ? error || submitError : helperText}
      error={isError}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      value={value}
      type={type}
      required={required}
      inputProps={{ required, ...restInput }}
      {...rest}
    />
  );
}

export const parseNumberProps = {
  type: 'number',
  fieldProps: {
    parse: Number,
  },
};

export function FormTextField<T = string>(props: TextFieldProps<T>) {
  const { name, fieldProps, ...rest } = props;

  return (
    <Field<T>
      name={name}
      render={({ input, meta }) => (
        <TextFieldWrapper variant="standard" input={input} meta={meta} name={name} {...rest} />
      )}
      {...fieldProps}
    />
  );
}
