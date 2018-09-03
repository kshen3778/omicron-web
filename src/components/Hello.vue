<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h2>Dashboard</h2>
    <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/rewards">Rewards Marketplace</router-link></li>
    </ul>
    <button class="btn btn-primary" v-on:click="logout">Logout</button>
    <br>
    <br>

    <div v-for="products in groupedProducts" class="row">
      <div v-for="value in products" class="col-lg-4">
            <div v-if="value" class="card mx-auto">
              <div class="card-body">
                <h5 class="card-title">{{value[1].name}}</h5>
                <p class="card-text">{{value[1].desc}}</p>
                <a :href="value[1].link" target="_blank" class="card-link">Send Feedback</a>
              </div>
            </div>
            <br>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'hello',
  data () {

    this.getAllProducts();
    return {
      msg: 'Send Feedback to Companies and Get Rewarded',
      products: {}
    }
  },
  computed: {
    groupedProducts: function() {
      var obj = this;
      var result = Object.keys(obj.products).map(function(key) {
        return [key, obj.products[key]];
      });

      console.log(result);
      var chunked = _.chunk(result, 3);
      console.log(chunked);
      return chunked;

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
        console.log(JSON.stringify(obj.products));
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
