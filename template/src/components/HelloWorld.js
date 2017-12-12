{{#classStyle}}import Vue from 'vue'
import Component from 'vue-class-component'

{{/classStyle}}{{#classStyle}}
@Component
export default class HelloWorld extends Vue {
  msg = 'Welcome to Your Vue.js App'
}{{else}}export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}{{/classStyle}}
