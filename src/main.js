// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;
let config = {
  apiKey: "AIzaSyATpcTwZcBsSG9OcBKgGL1mNvfU0bXu1SI",
  authDomain: "vue-auth-cd56e.firebaseapp.com",
  databaseURL: "https://vue-auth-cd56e.firebaseio.com",
  projectId: "vue-auth-cd56e",
  storageBucket: "",
  messagingSenderId: "733126669746"
};

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});
