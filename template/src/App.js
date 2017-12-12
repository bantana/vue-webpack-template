{{#classStyle}}import Vue from 'vue'
import Component from 'vue-class-component'

{{/classStyle}}
{{#unless router}}
import HelloWorld from './components/HelloWorld.vue'

{{/unless}}
{{#classStyle}}@Component{{#unless router}}({
  components: { HelloWorld }
}){{/unless}}
export default class App extends Vue {

}{{else}}export default {
  name: 'app'{{#router}}{{else}},
  components: { HelloWorld }{{/router}}
}{{/classStyle}}
