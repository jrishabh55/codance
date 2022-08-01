import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export default styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));
