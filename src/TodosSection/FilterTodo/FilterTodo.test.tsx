import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FilterTodo from "./FilterTodo";
import { useTodos } from "../../TodosProvider";

vi.mock("../../TodosProvider", () => ({
    useTodos: vi.fn(),
}));

describe("FilterTodo", () => {
    const mockFilterTodos = vi.fn();
    const mockUpdateAllTodos = vi.fn();

    const initialTodoList = [
        { id: 1, name: "Todo 1", completed: false },
        { id: 2, name: "Todo 2", completed: true },
        { id: 3, name: "Todo 3", completed: false },
    ];

    beforeEach(() => {
        (useTodos as jest.Mock).mockReturnValue({
            initialTodoList,
            filterTodos: mockFilterTodos,
            updateAllTodos: mockUpdateAllTodos,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("отрисовка  исходного состояния", () => {
        render(<FilterTodo />);

        expect(screen.getByText(/items left: 2/i)).toBeInTheDocument(); // 2 активных задачи
        expect(screen.getByText("All")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /clear completed/i })).toBeInTheDocument();
    });

    test("фильтрует задачи, которые нужно выполнить при нажатии на вкладку", () => {
        render(<FilterTodo />);

        // Нажатие на вкладку Active
        fireEvent.click(screen.getByText("Active"));
        expect(mockFilterTodos).toHaveBeenCalledWith([
            { id: 1, name: "Todo 1", completed: false },
            { id: 3, name: "Todo 3", completed: false },
        ]);

        // Нажатие на вкладку Completed
        fireEvent.click(screen.getByText("Completed"));
        expect(mockFilterTodos).toHaveBeenCalledWith([
            { id: 2, name: "Todo 2", completed: true },
        ]);
    });

    test("удаляет завершенные задачи при нажатии кнопки Очистить завершенные", () => {
        render(<FilterTodo />);

        fireEvent.click(screen.getByRole("button", { name: /clear completed/i }));

        expect(mockUpdateAllTodos).toHaveBeenCalledWith([
            { id: 1, name: "Todo 1", completed: false },
            { id: 3, name: "Todo 3", completed: false },
        ]);
    });

    test("корректное обрабатывание переключение вкладок", () => {
        render(<FilterTodo />);

        // Нажатие на вкладку Completed
        fireEvent.click(screen.getByText("Completed"));
        expect(mockFilterTodos).toHaveBeenCalledWith([
            { id: 2, name: "Todo 2", completed: true },
        ]);

        // Нажатие на вкладку All
        fireEvent.click(screen.getByText("All"));
        expect(mockFilterTodos).toHaveBeenCalledWith(initialTodoList);
    });
});
