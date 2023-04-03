import React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
// import { Box } from '@mui/system'; //commented out because although declared, box is not used

import '../common/GlobalStyles.css';

// Changed 'Text' to 'OutputBox'
const OutputBox = () => {
  return (
    <TextareaAutosize className='Input'
      aria-label="empty textarea"
      placeholder="This is where code appears! (Output field)"
      minRows={20}
    />
  );
}

export default OutputBox;