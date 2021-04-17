export default class Alert{
    constructor(id){
        this.alert = document.getElementById(id);
    }
    showAlert(msg){
        this.alert.innerText = msg
        this.alert.classList.remove('d-none');
    }
    hideAlert(){
        this.alert.classList.add('d-none')
    }
}