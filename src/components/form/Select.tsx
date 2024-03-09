import _ from "lodash";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select as MUISelect,
  SelectProps,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";

type Props<T, U> = {
  name: keyof T;
  formik: FormikProps<T>;
  options: U[];
  label: string;
  placeholder?: string;
  disabled?: boolean;
  optionValueKey?: keyof U;
  optionLabelKey?: keyof U;
  selectProps?: SelectProps;
};

export function Select<T, U>({
  name,
  label,
  placeholder,
  options,
  disabled = false,
  optionValueKey = "id" as keyof U,
  optionLabelKey = "name" as keyof U,
  formik,
  selectProps,
}: Props<T, U>) {
  const hasError = !!_.get(formik.errors, name) && !!formik.submitCount;
  const errorMessage = hasError ? _.get(formik.errors, name) : "";
  const value = _.get(formik.values, name);

  return (
    <>
      <Typography textAlign="left" mb={1} variant="body2">
        {label}
      </Typography>
      <FormControl fullWidth disabled={disabled} error={hasError}>
        <MUISelect
          name={name as string}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{
            "& .MuiSelect-select .notranslate::after": placeholder
              ? {
                  content: `"${placeholder}"`,
                  opacity: 0.42,
                }
              : {},
          }}
          {...selectProps}
        >
          {options.map((option) => (
            <MenuItem
              key={_.get(option, optionValueKey)}
              value={_.get(option, optionValueKey)}
            >
              {_.get(option, optionLabelKey)}
            </MenuItem>
          ))}
        </MUISelect>
        {hasError && (
          <FormHelperText error>{errorMessage?.toString()}</FormHelperText>
        )}
      </FormControl>
    </>
  );
}
