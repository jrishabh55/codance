import { Paper as BasePaper } from '@mui/material';
import { styled } from '@mui/system';

const Paper = styled(BasePaper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

export default Paper;
