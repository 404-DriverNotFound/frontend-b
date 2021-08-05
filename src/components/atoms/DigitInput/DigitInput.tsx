import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const StyledDigitInput = withStyles({
  root: {
    width: 75,
    height: 120,
    '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
    },
    '& input': {
      '-moz-appearance': 'textfield',
    },
  },
})(TextField);

// eslint-disable-next-line arrow-body-style
const DigitInput = () => {
  return (
    <StyledDigitInput
      variant="outlined"
      type="number"
      inputProps={{
        style: { textAlign: 'center', fontSize: 50 }, margin: 0,
      }}
    />
  );
};

export default DigitInput;
