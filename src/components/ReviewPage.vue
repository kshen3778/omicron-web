<template>
  <div class="hello">
    <div v-for="product in product" class="col-lg-4 col-centered">

        <img class="card-img-top" :src="product.imgurl">
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">{{product.desc}}</p>
          <a :href="product.link" target="_blank" class="card-link">Submit Feedback</a>
        </div>

    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'reviewpage',

  data () {

    this.getProductInfo();
    return {
      product: {}
    }
  },

  methods: {

    getProductInfo: function(){
      var obj = this;
      firebase.database().ref('products').orderByChild('id').equalTo(obj.$route.params.id).on("value", function(snapshot) {
          console.log(snapshot.val());
          obj.product = snapshot.val();
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
