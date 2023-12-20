import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { deleteButtonText, primaryColor } from 'utils/constant';
import { TodoProps } from 'utils/types';

const Todo: React.FC<TodoProps> = ({ id, description, onDelete }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        background: primaryColor,
        borderRadius: 1,
        marginBottom: 2,
      }}
    >
      <Typography sx={{ color: 'white' }}>{description}</Typography>
      <Button
        variant='outlined'
        startIcon={<DeleteIcon />}
        onClick={() => onDelete(id)}
        sx={{ color: 'white', border: '1px solid white' }}
      >
        {deleteButtonText}
      </Button>
    </Box>
  );
};

export default Todo;
