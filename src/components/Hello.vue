<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h2>Dashboard</h2>
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/rewards">Rewards Marketplace</router-link></li>
    </ul>
    <button class="btn btn-primary" v-on:click="logout">Logout</button>

    <div v-for="(value, key) in products">
          <div v-if="value" class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{value.name}}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a :href="value.link" target="_blank" class="card-link">Go somewhere</a>
            </div>
          </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'hello',
  data () {

    this.getAllProducts();
    return {
      msg: 'Send Feedback to Companies and Get Rewarded',
      products: null
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    getAllProducts: function() {
      var obj = this;
      firebase.database().ref('products').once('value').then(function(snapshot) {
        obj.products = snapshot.val();
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
