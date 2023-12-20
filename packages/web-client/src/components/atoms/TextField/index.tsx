import { FocusEventHandler } from 'react';
import { RefObject } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { InputLabelProps } from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

type MuiClassType = any;

type IProps = {
  color?: 'primary' | 'secondary' | 'inherit';
  placeholder?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  fullWidth?: boolean;
  id?: string;
  fieldName?: string;
  label?: string;
  value?: string;
  error?: boolean | undefined;
  type?: string;
  helperText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  enableValidation?: boolean;
  params?: JSX.IntrinsicAttributes & TextFieldProps;
  InputLabelProps?: Partial<InputLabelProps>;
  size?: 'medium' | 'small';
  inputRef?: RefObject<HTMLElement>;
  onKeyDown?: (e: { key: string }) => void;
  onClick?: () => void;
  focused?: boolean;
  onFocus?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  clickToEmpty?: boolean;
  clearField?: () => void;
};

type TAdornmentProps = {
  error: boolean | undefined;
  tooltipTitle: string;
};

type TClearAdornment = {
  classes?: MuiClassType;
  clearField: () => void;
};

const Adornment = ({ error, tooltipTitle }: TAdornmentProps) => {
  return (
    <>
      <InputAdornment position='end'>
        {error ? (
          <Tooltip title={tooltipTitle}>
            <ErrorOutlineIcon sx={{ fill: 'red' }} />
          </Tooltip>
        ) : (
          <CheckIcon sx={{ fill: 'success' }} />
        )}
      </InputAdornment>
    </>
  );
};

const CloseAdornment = ({ clearField }: TClearAdornment) => {
  return (
    <InputAdornment position='end'>
      <IconButton aria-label='clear search' size='small' onClick={clearField}>
        <CloseIcon />
      </IconButton>
    </InputAdornment>
  );
};

/**
 * A feature loaded customisable Text Field
 */
const CustomTextField = ({
  placeholder,
  variant,
  fullWidth,
  fieldName,
  id,
  label,
  value,
  error,
  helperText = '',
  onChange,
  type,
  size,
  enableValidation = false,
  handleBlur,
  InputLabelProps,
  inputRef,
  onKeyDown,
  onClick,
  focused,
  onFocus,
  clickToEmpty = false,
  clearField,
}: IProps & MuiClassType) => (
  <TextField
    placeholder={placeholder}
    variant={variant}
    fullWidth={fullWidth}
    id={id}
    name={fieldName}
    label={label}
    type={type}
    value={value}
    error={error}
    onChange={onChange}
    helperText={helperText}
    onBlur={handleBlur}
    InputLabelProps={InputLabelProps}
    InputProps={{
      endAdornment:
        clickToEmpty && clearField != undefined ? (
          <CloseAdornment clearField={clearField} />
        ) : enableValidation ? (
          value && <Adornment error={error} tooltipTitle={helperText} />
        ) : (
          <></>
        ),
    }}
    size={size}
    inputRef={inputRef}
    onKeyDown={onKeyDown}
    onClick={onClick}
    focused={focused}
    onFocus={onFocus}
  />
);

export default CustomTextField;
