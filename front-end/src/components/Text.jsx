import React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Box } from '@mui/system';

import '../common/GlobalStyles.css';

const Text = () => {
  return (
    <TextareaAutosize className='Input'
      aria-label="empty textarea"
      placeholder="Empty"
      minRows={20}
    />
  );
}

export default Text;