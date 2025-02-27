const app = Vue.createApp({});
//populate menu with a variable
app.component("mymenu", {
  props: ["menu"], //defining the props
  template: `<ul>
      <li v-for="menuItem in menu">{{menuItem}}</li>
    </ul>`,
});
app.mount("#app");
