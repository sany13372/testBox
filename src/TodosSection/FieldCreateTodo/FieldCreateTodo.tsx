import {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Box, TextField} from "@mui/material";

import {ITodo} from "../TodosSection";
import {generateRandomId} from "../../utils/generateRandomId";
import {useTodos} from "../../TodosProvider";

const FieldCreateTodo:FC = () => {
    const [nameTodo, setNameTodo] = useState<string>("")
    const {addTodo} = useTodos()
    const createTodoHandle = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" && nameTodo.trim() !== '' ) {
            const newTodo:ITodo = {
                id:generateRandomId(),
                name:nameTodo,
                completed:false
            }
            addTodo(newTodo)
            setNameTodo('')
        }
    };
    const setNameTodoHandle = (e:ChangeEvent<HTMLInputElement>) => {
        setNameTodo(e.target.value)
    }
    return (
        <Box sx={{ width: 580, maxWidth: 580 }}>
        <TextField
            label="NameTodo"
            fullWidth
            value={nameTodo}
            size="small"
            onKeyDown={createTodoHandle}
            onChange={setNameTodoHandle}
            variant="standard"
        />
        </Box>
    );
}

export default FieldCreateTodo;