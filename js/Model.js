class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'))
        if (!this.todos || this.todos.length < 1){
            this.todos =[{
                description: "My First Todo",
                finished: false,
                id:0,
                title: "Title 0"
            }]
            this.id = 1
        }else{
            this.id = this.todos[this.todos.length-1].id+1
        }

        
    }
    editTodo(id,values){
        const index = this.findTodoIndex(id)
        Object.assign(this.todos[index],values)
        this.save()
    }

    setView(view) {
        this.view = view;
    }
    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    getTodos(){
        return this.todos.map( todo =>({ ...todo }) )
    }
    appendTodo(title, description) {
        const todo = {
            id: this.id++,
            title,
            description,
            finished: false
        }
        this.todos.push(todo);
        this.save();

        return { ...todo }
    }
    removeTodo(id) {
        const index = this.findTodoIndex(id)
        this.todos.splice(index, 1)
        this.save();
    }
    toggleTodo(checked, id) {
        const index = this.findTodoIndex(id);
        this.todos[index].finished = checked
        console.log(this.todos)
        this.save();
    }
    findTodoIndex(id) {
        return this.todos.findIndex(todo => todo.id === id);
    }
}
export default Model