import _ from 'lodash';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import { FormikProps } from 'formik';

import {
  TimePicker as MuiTimePicker,
  TimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

type Props<T> = {
  name: keyof T;
  formik: FormikProps<T>;
  label: string;
  disabled?: boolean;
  timePickerProps?: TimePickerProps<Date>;
};

export function TimePicker<T>({
  formik,
  name,
  label,
  disabled,
  timePickerProps,
}: Props<T>) {
  const hasError = !!_.get(formik.errors, name) && !!formik.submitCount;
  const errorMessage = hasError ? _.get(formik.errors, name) : '';
  const value = _.get(formik.values, name);

  return (
    <>
      <Typography textAlign='left' variant='body2' mb={1}>
        {label}
      </Typography>
      <FormControl fullWidth disabled={disabled} error={hasError}>
        <MuiTimePicker
          name={name as string}
          value={value}
          onChange={(value) => formik.setFieldValue(name as string, value)}
          {...timePickerProps}
        />
        {hasError && (
          <FormHelperText error>{errorMessage?.toString()}</FormHelperText>
        )}
      </FormControl>
    </>
  );
}
