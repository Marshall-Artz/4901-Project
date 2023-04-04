import React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
// import { Box } from '@mui/system'; //commented out because although declared, box is not used

import '../common/GlobalStyles.css';

// Changed 'Text' to 'InputBox'
const InputBox = () => {
  return (
    <TextareaAutosize className='Input'
      aria-label="empty textarea"
      placeholder="Enter text here! (This is the Input field)"
      minRows={20}
    />
  );
}

export default InputBox;