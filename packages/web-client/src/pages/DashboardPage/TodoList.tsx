import { Box } from '@mui/material';
import { TodoListProps } from 'utils/types';

import Todo from './Todo';

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <Box>
      {todos.map(todo => (
        <Todo key={todo._id} id={todo._id} description={todo.description} onDelete={onDelete} />
      ))}
    </Box>
  );
};

export default TodoList;
