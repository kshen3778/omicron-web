<template>
  <div>
  <h1>Dashboard</h1>

    <br>
    <br>

    <div v-for="products in groupedProducts" class="row p-5">
      <!--- Modify Design -->
      <div v-for="value in products" class="col-lg-4">
                <v-card>
                  <img class="card-img-top" :src="value[1].imgurl">
                  <v-card-title>
                    <div>
                      <h3>{{value[1].name}}</h3><br>
                      <span>{{value[1].desc}}</span><br>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange"><router-link :to="'/review/'+value[1].id">Send Feedback</router-link></v-btn>
                  </v-card-actions>
                </v-card>
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

    getImages: function (products) {
      console.log(products);
      for (var item in products){
        console.log(products[item].imgsrc);
        var url = this.getImage(products[item].imgsrc);
        console.log(url);
        products[item].imgurl = url;
      }
      console.log(products);
      return products;
    },

    getImage: function (imgsrc) {
      var storage = firebase.storage();
      var pathReference = storage.ref(imgsrc);

      pathReference.getDownloadURL().then(function(url) {
        var pulledImage = url;
        return pulledImage
      });

      //return "https://firebasestorage.googleapis.com/v0/b/vue-auth-cd56e.appspot.com/o/balsamiq.png?alt=media&token=e3c8ee15-ecd6-4186-b408-fc2332b2dedf";

      //console.log(imgsrc);
      /*pathReference.getDownloadURL().then(function(url) {
        console.log(url);
        console.log(typeof url);
        var imgurl = url;
        return imgurl;


      }).catch(function(error) {
        // Handle any errors
        console.log("Image not found: " + imgsrc);
        console.log(error.code);
      });*/
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    getAllProducts: function() {
      var obj = this;
      firebase.database().ref('products').orderByChild("active").equalTo(true).once('value').then(function(snapshot) {
        obj.products = snapshot.val();
        console.log(JSON.stringify(obj.products));
        //obj.products = obj.getImages(obj.products);
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
