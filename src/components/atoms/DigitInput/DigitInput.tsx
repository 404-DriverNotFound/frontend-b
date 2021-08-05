import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const StyledDigitInput = withStyles({
  root: {
    width: 75,
    height: 120,
  },
})(TextField);

type DigitInputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  value?: string,
};

// eslint-disable-next-line arrow-body-style
const DigitInput = ({ onChange, value }: DigitInputProps) => {
  return (
    <StyledDigitInput
      variant="outlined"
      type="text"
      inputProps={{
        style: { textAlign: 'center', fontSize: 50 }, margin: 0, maxLength: 1,
      }}
      onChange={onChange}
      value={value}
    />
  );
};

DigitInput.defaultProps = {
  onChange: null,
  value: '',
};

export default DigitInput;
