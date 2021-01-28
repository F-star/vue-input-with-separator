import Vue from 'vue'
import InputWithSep from './input-with-spe'

const app = document.createElement('div')
app.id = 'app'
document.body.appendChild(app)

const App = Vue.extend(InputWithSep)

const vm = new App({
  propsData: {
    blocks: [3, 4, 4]
  }
})

// console.log(vm)
window.vm = vm

vm.$mount('#app')

