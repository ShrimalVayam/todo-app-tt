import { useEffect, useState } from 'react';
import { Box, Button, FormControl, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import {
  addButtonText,
  createdSuccessfully,
  deletedSuccessfully,
  snackSuccessString,
  todoAppText,
} from 'utils/constant';
import { deleteRequest, getRequest, postRequest } from 'utils/functions';

import CustomTextField from 'components/atoms/TextField';

import TodoList from './TodoList';

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<{ _id: number; description: string }[]>([]);
  const [newTodo, setNewTodo] = useState('');
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todosData = await getRequest('/todos');
    setTodos(todosData);
  };

  const handleDeleteTodo = async (_id: number) => {
    await deleteRequest(`/todos/${_id}`);
    enqueueSnackbar(deletedSuccessfully, {
      variant: snackSuccessString,
    });
    fetchTodos();
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    await postRequest('/todos/create', { description: newTodo });
    enqueueSnackbar(createdSuccessfully, {
      variant: snackSuccessString,
    });
    setNewTodo('');
    fetchTodos();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          '@media (min-width:600px)': {
            width: '40%',
          },
        }}
      >
        <Typography
          variant='h4'
          sx={{
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          {todoAppText}
        </Typography>
        <form className='main__form' onSubmit={handleCreateTodo}>
          <FormControl
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <CustomTextField
              variant='outlined'
              fullWidth={true}
              id='todo'
              fieldName='todo'
              type='todo'
              label='Add Todo'
              value={newTodo}
              onChange={(e: { target: { value: React.SetStateAction<string> } }) => setNewTodo(e.target.value)}
              required
            />
            <Button type='submit' fullWidth variant='contained' sx={{ p: 1, mb: 4 }} disabled={!newTodo}>
              {addButtonText}
            </Button>
          </FormControl>
        </form>
        {todos.length !== 0 ? (
          <TodoList todos={todos} onDelete={handleDeleteTodo} />
        ) : (
          <Typography align='center'>No todos available</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
