import Model from './Model.js'
import View from './View.js'

document.addEventListener('DOMContentLoaded',()=>{
    const model = new Model()
    const view = new View()
    view.setModel(model)
    view.render()
})