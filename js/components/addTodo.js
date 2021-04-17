import Alert from './alert.js'

export default class addTodo{
    constructor() {
        this.btn = document.getElementById('add');
        this.description = document.getElementById('description');
        this.title = document.getElementById('title');
        this.alert = new Alert('alert')
    }
    onClick(callback){
        this.btn.onclick = () =>{
            if ( !this.description.value || !this.title.value ){
                const msg = 'this fields are required!'
                this.alert.showAlert(msg)
                console.error(msg)
            }else{
                this.alert.hideAlert()
                callback(this.title.value,this.description.value)
            }
        }
    }
}