<template>
  <div>
    <h1>Dashboard</h1
    <br>

    <div v-for="products in groupedProducts" class="row p-5 item-row">

        <div v-for="value in products" class="item-card">
          <v-hover>
                  <v-card style="cursor: pointer;" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto" width="370" @click.native="gotoLink('/review/'+value[1].id)">
                    <img class="card-img-top" :src="value[1].imgurl">
                    <v-card-title class="justify-center">
                      <div>
                        <h3>{{value[1].name}}</h3>
                        <h5 style="color: #737373;">{{value[1].desc}}</h5><br>
                      </div>
                    </v-card-title>

                  </v-card>

          </v-hover>
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
      var chunked = _.chunk(result, 4);
      console.log(chunked);
      return chunked;

    }
  },
  methods: {

    gotoLink: function(value){
      this.$router.push(value);
    },

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

.item-row {
    margin: 0 90px
}

.item-card {
  margin: 0 10px;
}


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
    padding: 40px 40px 40px 40px;

}
</style>
