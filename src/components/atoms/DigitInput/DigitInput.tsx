import React from 'react';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const StyledDigitInput = withStyles({
  root: {
    width: 70,
    height: 100,
    border: '1px solid',
    borderRadius: '5px',
  },
})(Input);

type DigitInputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  value?: string,
};

// eslint-disable-next-line arrow-body-style
const DigitInput = ({ onChange, value }: DigitInputProps) => {
  return (
    <StyledDigitInput
      type="text"
      inputProps={{ style: { textAlign: 'center', fontSize: 40 }, maxLength: 1 }}
      onChange={onChange}
      value={value}
      disableUnderline
    />
  );
};

DigitInput.defaultProps = {
  onChange: undefined,
  value: '',
};

export default DigitInput;
