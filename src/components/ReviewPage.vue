<template>
  <div>
    <div v-for="product in productinfo">
        <img class="card-img-top" style="width:30%;":src="product.imgurl">
        <div class="card-body">
          <h2 class="card-title">{{product.name}}</h2>
          <h2 class="card-text">{{product.desc}}</h2>
          <h3><a :href="product.link" target="_blank" class="card-link">Submit Feedback</a></h3>
          <br>
          <h2>Please allow up to 24-48 hours for points to be assigned after submitting feedback.</h2>
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

  data() {
    return {
      productinfo: {}
    }
  },

  created() {
    this.getProductInfo();
  },

  methods: {

    getProductInfo: function(){
      var obj = this;
      console.log(obj.$route.params.id);
      firebase.database().ref('products').orderByChild('id').equalTo(obj.$route.params.id).on("value", function(snapshot) {
          console.log(snapshot.val());
          obj.productinfo = snapshot.val();
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
