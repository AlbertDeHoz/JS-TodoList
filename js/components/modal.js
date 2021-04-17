import Alert from './alert.js'

export default class Modal {
    constructor(){
        this.title = document.getElementById('modal-title')
        this.description = document.getElementById('modal-description')
        this.finished = document.getElementById('modal-completed')
        this.btn = document.getElementById('modal-btn')
        this.todo = null
        this.alert = new Alert('modal-alert')
    }
    render(todo){
        this.todo = todo
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.finished.checked = todo.finished;
    }
    onClick(callback){
        this.btn.onclick= () => {
            if(!this.title.value || !this.description.value ){
                this.alert.showAlert('these fields are required')
                return
            }
            this.alert.hideAlert()
            const todoEdit = {
                title:this.title.value,
                description:this.description.value,
                finished:this.finished.checked
            }
            callback(this.todo.id,todoEdit)
            $('#modal').modal('toggle')
            //callback( this.todo.id, todoEdit)
        }
    }
}