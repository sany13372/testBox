import {createContext, useContext, useState, FC, PropsWithChildren} from "react";

export interface ITodo {
    id: string;
    name: string;
    completed: boolean;
}

export interface ITodosContextProps {
    todoList: ITodo[];
    initialTodoList: ITodo[];
    addTodo: (todo: ITodo) => void;
    updateTodo: (id: string, completed: boolean) => void;
    filterTodos: (filteredTodos: ITodo[]) => void;
    updateAllTodos:(updateTodos:ITodo[]) => void;
}

const TodosContext = createContext<ITodosContextProps | undefined>(undefined);

export const TodosProvider: FC<PropsWithChildren> = ({ children }) => {
    const [todoList, setTodoList] = useState<ITodo[]>([]);
    const [initialTodoList, setInitialTodoList] = useState<ITodo[]>([]);

    const addTodo = (todo: ITodo) => {
        setTodoList((prev) => [...prev, todo]);
        setInitialTodoList((prev) => [...prev, todo]);
    };

    const updateTodo = (id: string, completed: boolean) => {
        const todos = initialTodoList.map((todo) => (todo.id === id ? { ...todo, completed } : todo))

        updateAllTodos(todos);
    };

    const filterTodos = (filteredTodos: ITodo[]) => {
        setTodoList(filteredTodos);
    };
    const updateAllTodos = (updateTodos:ITodo[]) => {
        setTodoList(updateTodos)
        setInitialTodoList(updateTodos)
    }

    return (
        <TodosContext.Provider
            value={{ todoList, initialTodoList, addTodo, updateTodo, filterTodos, updateAllTodos }}
        >
            {children}
        </TodosContext.Provider>
    );
};

export const useTodos = (): ITodosContextProps => {
    const context = useContext(TodosContext);
    if (!context) {
        throw new Error("Error");
    }
    return context;
};