/* eslint-disable arrow-body-style */
import React from 'react';
import MaterialSwitch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const StyledSwitch = withStyles({
  root: {

  },
})(MaterialSwitch);

export type SwitchProps = {
  checked: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  name: string,
  color: 'default' | 'primary' | 'secondary',
};

const Switch = ({
  checked, onChange, name, color,
}: SwitchProps) => {
  return (
    <StyledSwitch
      checked={checked}
      onChange={onChange}
      name={name}
      color={color}
    />
  );
};

Switch.defaultProps = {
  checked: false,
  name: 'twoFactorSW',
  color: 'primary',
};

export default Switch;
