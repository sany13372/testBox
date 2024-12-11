import {FC} from 'react';
import TodoListItem from "./TodoListItem";
import {useTodos} from "../../TodosProvider";

const TodoList:FC = () => {
    const {todoList} = useTodos()
    return (
        <div>
            {todoList.map((item) => <TodoListItem item={item} key={item.id}/>)}
        </div>
    );
}

export default TodoList;