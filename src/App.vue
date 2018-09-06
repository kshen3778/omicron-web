<template>
  <div id="app">

    <app-header></app-header>

    <br>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import firebase from 'firebase';
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    methods: {

    }

  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
