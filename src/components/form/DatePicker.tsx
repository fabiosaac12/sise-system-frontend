import _ from "lodash";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { FormikProps } from "formik";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";

type Props<T> = {
  name: keyof T;
  formik: FormikProps<T>;
  label: string;
  disabled?: boolean;
  datePickerProps?: DatePickerProps<Date>;
};

export function DatePicker<T>({
  formik,
  name,
  label,
  disabled,
  datePickerProps,
}: Props<T>) {
  const hasError = !!_.get(formik.errors, name) && !!formik.submitCount;
  const errorMessage = hasError ? _.get(formik.errors, name) : "";
  const value = _.get(formik.values, name);

  return (
    <>
      <Typography textAlign="left" variant="body2" mb={1}>
        {label}
      </Typography>
      <FormControl fullWidth disabled={disabled} error={hasError}>
        <MuiDatePicker
          name={name as string}
          value={value}
          onChange={(value) => formik.setFieldValue(name as string, value)}
          {...datePickerProps}
        />
        {hasError && (
          <FormHelperText error>{errorMessage?.toString()}</FormHelperText>
        )}
      </FormControl>
    </>
  );
}
