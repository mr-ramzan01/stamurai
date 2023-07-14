import { types } from 'mobx-state-tree';

const TaskModel = types.model('TaskModel', {
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

export const TaskStore = types.model('TaskStore', {
    tasks: types.array(TaskModel)
})
.actions(el => ({
    addTodo(title:string, description:string) {
        const id = String(Date.now());
        el.tasks.push({ id, title, description, status: false });
        // localStorage.setItem('tasks', JSON.stringify(el.tasks))
    },
    removeTodo(todo:any) {
        el.tasks.remove(todo);
        // localStorage.setItem('tasks', JSON.stringify(el.tasks))
    },
}));