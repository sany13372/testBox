import {FC} from 'react';
import TodoListItem from "./TodoListItem";
import {useTodos} from "../../TodosProvider";
import {Box} from "@mui/material";

const TodoList:FC = () => {
    const {todoList} = useTodos()
    return (
        <Box sx={{maxHeight:400,overflowY:'scroll'}}>
            {todoList.map((item) => <TodoListItem item={item} key={item.id}/>)}
        </Box>
    );
}

export default TodoList;