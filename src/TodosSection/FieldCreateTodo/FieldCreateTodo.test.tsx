import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import FieldCreateTodo from './FieldCreateTodo';
import { useTodos } from "../../TodosProvider";
// Мокаем контекст useTodos и типизируем его
vi.mock("../../TodosProvider", () => ({
    useTodos: vi.fn(),
}));

describe('FieldCreateTodo', () => {

    it('Создание задачи при нажатии Enter', async () => {
        const addTodoMock = vi.fn();
        // Типизируем мок useTodos
        (useTodos as jest.Mock).mockReturnValue({ addTodo: addTodoMock });

        render(<FieldCreateTodo />);

        const input = screen.getByLabelText(/NameTodo/i);

        // Вводим текст в поле ввода
        await userEvent.type(input, 'New Todo');

        // Проверяем, что введенный текст присутствует в поле
        expect(input).toHaveValue('New Todo');

        // Симулируем нажатие клавиши Enter
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Ожидаем, что функция addTodo будет вызвана
        await waitFor(() => expect(addTodoMock).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'New Todo',
                completed: false
            })
        ));

        // Проверяем, что поле ввода очищается
        expect(input).toHaveValue('');
    });

    it('задача не должна создаваться если поле пустое', async () => {
        const addTodoMock = vi.fn();
        // Типизируем мок useTodos
        (useTodos as jest.Mock).mockReturnValue({ addTodo: addTodoMock });

        render(<FieldCreateTodo />);

        const input = screen.getByLabelText(/NameTodo/i);

        // Симулируем нажатие клавиши Enter, не введя текст
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Проверяем, что функция addTodo не была вызвана
        await waitFor(() => expect(addTodoMock).not.toHaveBeenCalled());
    });
});
