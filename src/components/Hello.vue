<template>
  <div class="hello">
    <h1>Dashboard</h1>


    <br>
    <br>

    <div v-for="products in groupedProducts" class="row p-5">
      <div v-for="value in products" class="col-lg-4">
            <div v-if="value" class="card mx-auto">
              <img class="card-img-top" :src="getImage(value[1].imgsrc + '.png')">
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
    getImage (img) {
        var i = require("../assets/"+img);
        return i;
    },
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

.card-img-top {
    width: 100%;
    height: 12vw;

}
</style>
