import { Navigate } from 'react-router-dom';
import { getLsItem } from 'utils/functions';
import { IChildrenNodes } from 'utils/types';

export const ProtectedRoute = ({ children }: IChildrenNodes) => {
  const token = getLsItem('token');
  return token ? children : <Navigate to='/login' />;
};
