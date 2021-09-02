import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'lightgray',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      overflow: 'hidden',
    },
    scrollbarColor: 'lightgray transparent',
  },
});

type ChatInputProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>,
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  value?: string,
};

const ChatInput = ({ onSubmit, onChange, value }: ChatInputProps) => {
  const classes = useStyles();

  return (
    <form onSubmit={onSubmit}>
      <TextField
        className={classes.root}
        onChange={onChange}
        value={value}
        label="Chat on here!"
        variant="outlined"
        fullWidth
      />
    </form>
  );
};

ChatInput.defaultProps = {
  value: '',
};

export default ChatInput;
