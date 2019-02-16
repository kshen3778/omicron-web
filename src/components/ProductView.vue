<template>


  <div class="admin" v-if="this.$parent.logged_in && this.$parent.user_data.admin">

    <h2> Products </h2>
    <b-card bg-variant="light">
        <b-form-group horizontal breakpoint="lg" label="Create New" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0">

            <b-form-group horizontal
                          label="Name:"
                          label-class="text-sm-right">
              <b-form-input v-model="product.name"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="Description:"
                          label-class="text-sm-right">
              <b-form-input v-model="product.desc"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="Form Link:"
                          label-class="text-sm-right">
              <b-form-input v-model="product.link"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="Sub-URL id:"
                          label-class="text-sm-right">
              <b-form-input v-model="product.id"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="Image Url:"
                          label-class="text-sm-right">
              <b-form-input v-model="product.imgurl"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="Points value:"
                          label-class="text-sm-right">
              <b-form-input type="number" v-model="product.points"></b-form-input>
            </b-form-group>
            <b-form-group horizontal>
              <button class="btn btn-primary" v-on:click="createProduct(product)">Create</button>
            </b-form-group>

        </b-form-group>

    </b-card>

    <br>
    <br>

    <b-list-group>


      <div v-for="(value, key) in products_list">
            <div v-if="value">
              <b-list-group-item>
                {{key}}
                <br>
                {{value.name}}
                <br>
                {{value.desc}}
                <br>
                {{value.link}}
                <br>
                {{value.id}}
                <br>
                {{value.imgurl}}
                <br>
                Points: {{value.points}}
                <br>
                Active: {{value.active}}
                <br>
                <button type="button" class="btn btn-primary" v-b-modal="''+key">Edit</button>
                <button type="button" class="btn btn-danger" v-on:click="deleteProduct(key)">Delete</button>

                <b-modal :id="''+key" :title="value.name">
                  <b-form-group horizontal
                                label="Name:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value.name"></b-form-input>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Description:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value.desc"></b-form-input>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Form Link:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value.link"></b-form-input>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Sub-URL id:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value.id"></b-form-input>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Image Url:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value.imgurl"></b-form-input>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Points value:"
                                label-class="text-sm-right">
                    <b-form-input type="number" v-model="value.points"></b-form-input>
                  </b-form-group>

                  <div slot="modal-footer">
                    <button type="button" class="btn btn-danger" v-if="value.active" v-on:click="setActive(key, false)">Deactivate</button>
                    <button type="button" class="btn btn-success" v-if="!value.active" v-on:click="setActive(key, true)">Activate</button>
                    <button type="button" class="btn btn-primary" v-on:click="saveChanges(key, value)">Save Changes</button>
                  </div>
                </b-modal>
              </b-list-group-item>

            </div>
      </div>
    </b-list-group>

    <br>
    <br>

  </div>


</template>

<script>
import firebase from 'firebase';
import router from '../router';

export default {
  name: 'productview',
  data () {

    this.getAllProducts();
    //this.getUserData(); //REMOVE AFTER TESTS
    return {
      product_msg: "",
      product: {},
      products_list: {},

    }

  },
  methods: {

    //Activates and deactivates a product
    setActive: function(key, val){
      firebase.database().ref('products/' + key).update({
        active: val
      }).catch(function(error) {
          alert("Oops. " + err.message);
          console.log(error);
      });
      this.getAllProducts();
    },

    getAllProducts: function() {
      var obj = this;
      firebase.database().ref('products').once('value').then(function(snapshot) {
        obj.products_list = snapshot.val();
        console.log(obj.products_list);
      });
    },
    createProduct: function(product){
      //create a product
      firebase.database().ref('products/').push({
        name: product.name,
        desc: product.desc,
        link: product.link,
        id: product.id,
        imgurl: product.imgurl,
        points: parseInt(product.points),
        active: true
      }).catch(function(error) {
          alert("Oops. " + err.message);
          console.log(error);
      });

      this.getAllProducts();
      this.product_msg = "Created!";
    },
    saveChanges: function(key, value){
      //edit a product
      firebase.database().ref('products/' + key).update({
        name: value.name,
        desc: value.desc,
        link: value.link,
        id: value.id,
        imgurl: value.imgurl,
        points: parseInt(value.points)
      }).catch(function(error) {
          alert("Oops. " + err.message);
          console.log(error);
      });;
      this.getAllProducts();
    },

    deleteProduct: function(key){
      if(confirm("Are you sure?")){
        //delete a product
        firebase.database().ref('products/' + key).remove();
        this.getAllProducts();
      }
    },
    getUserData: function(){
      var obj = this;
      var userid = firebase.auth().currentUser.uid;
      //Retrieve User Data
      firebase.database().ref('users/'+userid).once('value').then(function(snapshot) {
          obj.user_data = snapshot.val();
      }).catch(function(error) {
          alert("Oops. " + err.message);
          console.log(error);
      });;
    }

  }
}
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }

  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
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
</style>
