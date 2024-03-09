import _ from "lodash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { useState } from "react";

type Props<T> = {
  name: keyof T;
  formik: FormikProps<T>;
  label: string;
  placeholder: string;
  type?: "text" | "password" | "textarea" | "number";
  textFieldProps?: TextFieldProps;
};

export function TextField<T>({
  formik,
  type,
  name,
  label,
  placeholder,
  textFieldProps,
}: Props<T>) {
  const hasError = !!_.get(formik.errors, name) && !!formik.submitCount;
  const errorMessage = hasError ? _.get(formik.errors, name) : "";
  const value = _.get(formik.values, name);

  const [showValue, setShowValue] = useState(
    type === "password" ? false : true
  );

  return (
    <>
      <Typography textAlign="left" variant="body2" mb={1}>
        {label}
      </Typography>
      <MuiTextField
        type={type === "password" ? (showValue ? "text" : "password") : type}
        placeholder={placeholder}
        name={name as string}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={hasError}
        helperText={hasError ? errorMessage?.toString() : undefined}
        multiline={type === "textarea"}
        InputProps={
          type === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={() => setShowValue(!showValue)}
                    >
                      {showValue ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
        {...textFieldProps}
      />
    </>
  );
}
