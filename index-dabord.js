document.addEventListener('DOMContentLoaded', ()=>{
    const addBtn = document.getElementById('add');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const alert = document.getElementById('alert');
    const table = document.getElementById('table');
    let key = 1;

    const removeTodo = (key) => {
        document.getElementById(key).remove()
    }
    
    const addTodo =()=>{
        if(!title.value || !description.value){
            alert.classList.remove('d-none')
            alert.innerHTML="These shields are required"
            return
        }
        alert.classList.add('d-none')
        const row = table.insertRow();
        row.setAttribute('id',key++)
        row.innerHTML=`
            <td>${title.value}</td>
            <td>${description.value}</td>
            <td class="text-center">
                <input type="checkbox">
                </td>
                <td class="text-right">
                <button class="btn btn-primary mb-1">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>
        `
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn','btn-danger','mb-1','ml-1')
        removeBtn.innerHTML='<i class="fa fa-trash"></i>'
        removeBtn.onclick= () =>{
            removeTodo(row.getAttribute('id'))
        }
        row.children[3].appendChild(removeBtn);
    }
    
    addBtn.onclick = addTodo
    //addBtn.addEventListener('click',()=> console.log('hola'));
})