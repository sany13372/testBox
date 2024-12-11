import {FC} from 'react';
import FieldCreateTodo from "./FieldCreateTodo/FieldCreateTodo";
import TodoList from "./TodoList/TodoList";
import FilterTodo from "./FilterTodo/FilterTodo";

export interface ITodo{
    id:string
    name:string
    completed:boolean
}
const TodosSection:FC = () => {

    return (
        <section>
            <FieldCreateTodo  />
            <TodoList />
            <FilterTodo />
        </section>
    );
}

export default TodosSection;