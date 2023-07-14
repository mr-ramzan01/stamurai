import { types } from 'mobx-state-tree';

const TodoModel = types.model('TodoModel', {
    id: types.string,
    title: types.string,
    description: types.string,
    status: types.boolean
})
.actions(el => ({
    toggle() {
        el.status = !el.status;
    },
}));

export const TodoStore = types.model('TodoStore', {
    todos: types.array(TodoModel)
})
.actions(el => ({
    addTodo(title:string, description:string) {
        const id = String(Date.now());
        el.todos.push({ id, title, description, status: false });
    },
    removeTodo(todo:any) {
        el.todos.remove(todo);
    },
}));