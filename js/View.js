import addTodo from './components/addTodo.js'
import Modal from './components/modal.js'
import Filters from './components/filters.js'

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.AddBtn = document.getElementById('add');
        this.addTodoForm = new addTodo()
        this.modal = new Modal();
        this.filters = new Filters();
        
    }
    render(){
        this.addTodoForm.onClick((title, description) => this.addTodo(title, description))
        this.filters.onClick( (filter)=> this.runFilter(filter) )

        const todos = this.model.getTodos()
        todos.forEach(todo => {this.createRow(todo)})
        
        this.modal.onClick((id,values)=>this.editTodo(id,values))
    }
    setModel(model) {
        this.model = model
    }
    runFilter(filter){
        const { type, words } = filter;
        const [_,...rows] = this.table.getElementsByTagName('tr');
        rows.forEach( row => {
            const [title, description, finished] = row.children;
            let  mustBeHiden = false;

            if( words){
                mustBeHiden = words!==description.innerText && words!== title.innerText
            }

            const isFinished = finished.children[0].checked
            const mustBeFinished = type === 'completed'

            if( type !== 'all' && isFinished !== mustBeFinished ){
                mustBeHiden = true
            }
            if(mustBeHiden){
                row.classList.add('d-none')
            }else{
                row.classList.remove('d-none')
            }
            //() => mustBeHiden?row.classList.add('d-none'):row.classList.remove('d-none')

            console.log(row, mustBeHiden)
        } )
    }
    addTodo(title, description) {
        const todo = this.model.appendTodo(title, description);
        this.createRow(todo)
    }
    editTodo(id,values){
        this.model.editTodo(id,values)
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.finished;
    }
    createRow(todo) {
        const row = this.table.insertRow();
        row.setAttribute('id', todo.id)
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
            </td>
            <td class="text-right">
            </td>
        `
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked=todo.finished
        checkbox.onclick = () => this.toggleTodo(checkbox.checked, todo.id)
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle','modal');
        editBtn.setAttribute('data-target','#modal');
        editBtn.onclick = ()=> this.modal.render({
            id:todo.id,
            title:row.children[0].innerText,
            description:row.children[1].innerText,
            finished:row.children[2].children[0].checked
        });
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
    toggleTodo(checked, id) {
        this.model.toggleTodo(checked, id)
    }
    removeTodo(id) {
        this.model.removeTodo(id)
        document.getElementById(id).remove()
    }
}