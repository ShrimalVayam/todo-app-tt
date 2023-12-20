export interface RoutesObject {
  path: string;
  component: TGenericType;
  exact: boolean;
}
export interface IChildrenNodes {
  children: JSX.Element;
}

export type TGenericType = any;

export type TReactChildren = {
  children: JSX.Element;
};
export type TodoProps = {
  id: number;
  description: string;
  onDelete: (id: number) => void;
};
export interface TodoListProps {
  todos: {
    description: string;
    _id: number;
  }[];
  onDelete: (id: number) => void;
}
export interface UserData {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
