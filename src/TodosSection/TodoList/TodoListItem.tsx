import {ChangeEvent, FC} from 'react';
import {ITodo} from "../TodosSection";
import {Box, Card, Checkbox, Typography} from "@mui/material";
import {useTodos} from "../../TodosProvider";

interface ITodoListItem{
    item:ITodo,
}
const styles = {
    card: {
        minWidth: 580,
        minHeight: 40,
        maxWidth: 580,
    },
    box: {
        display: 'flex',
        alignItems: 'center',
    },
    text: (completed: boolean) => ({
        textDecoration: completed ? 'line-through' : 'none',
    }),
};
const TodoListItem: FC<ITodoListItem> = ({ item }) => {
    const {updateTodo} = useTodos()
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        updateTodo(item.id, e.target.checked);
    };

    return (
        <Card sx={styles.card}>
            <Box sx={styles.box}>
                <Checkbox
                    aria-label={item.name}
                    checked={item.completed}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography variant="h5" component="div" sx={styles.text(item.completed)}>
                    {item.name}
                </Typography>
            </Box>
        </Card>
    );
};

export default TodoListItem;