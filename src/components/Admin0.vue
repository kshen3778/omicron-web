<template>

  <div class="login" v-if="!logged_in">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button v-on:click="signIn">Log In</button>
  </div>

  <div class="admin" v-else-if="logged_in && user_data.admin && view=='products'">
    <h1> Admin Dashboard </h1>
    <button class="btn btn-primary" v-on:click="switchView('rewards')">View Items</button>
    <button class="btn btn-primary" v-on:click="switchView('requests')">View Requests</button>
    <br>

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
                          label="Link:"
                          label-class="text-sm-right">
              <b-form-input v-model="product.link"></b-form-input>
            </b-form-group>

            <b-form-group horizontal>
              <button class="btn btn-primary" v-on:click="createProduct(product)">Create</button>
            </b-form-group>

        </b-form-group>

        <h3> {{product_msg}} </h3>
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
                <button type="button" class="btn btn-primary" v-on:click="test(key)" v-b-modal="''+key">Edit</button>
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
                                label="Link:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value.link"></b-form-input>
                  </b-form-group>
                  <div slot="modal-footer">
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

  <div class="admin" v-else-if="logged_in && user_data.admin && view=='rewards'">
    <h1> Admin Dashboard </h1>
    <button class="btn btn-primary" v-on:click="switchView('products')">View Products</button>
    <button class="btn btn-primary" v-on:click="switchView('requests')">View Requests</button>
    <br>

    <h2> Reward Items </h2>
    <b-card bg-variant="light">
        <b-form-group horizontal breakpoint="lg" label="Create New" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0">

            <b-form-group horizontal
                          label="Name:"
                          label-class="text-sm-right">
              <b-form-input v-model="item.name"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="Description:"
                          label-class="text-sm-right">
              <b-form-input v-model="item.desc"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="Amount Left:"
                          label-class="text-sm-right">
              <b-form-input v-model="item.amount" type="number"></b-form-input>
            </b-form-group>

            <b-form-group horizontal
                          label="Cost:"
                          label-class="text-sm-right">
              <b-form-input v-model="item.cost" type="number"></b-form-input>
            </b-form-group>

            <b-form-group horizontal>
              <button class="btn btn-primary" v-on:click="createRewardItem(item)">Create</button>
            </b-form-group>

        </b-form-group>

        <h3> {{rewardItem_msg}} </h3>
    </b-card>

    <br>
    <br>

    <b-list-group>


      <div v-for="(value2, key2) in rewards_list">
            <div v-if="value2">
              <b-list-group-item>
                {{key2}}
                <br>
                {{value2.name}}
                <br>
                {{value2.desc}}
                <br>
                Amount Remaining: {{value2.amount}}
                <br>
                Cost in Points: {{value2.cost}}
                <br>

                <button type="button" class="btn btn-primary" v-on:click="test(key2)" v-b-modal="''+key2">Edit</button>
                <button type="button" class="btn btn-danger" v-on:click="deleteRewardItem(key2)">Delete</button>

                <b-modal :id="''+key2" :title="value2.name">
                  <b-form-group horizontal
                                label="Name:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value2.name"></b-form-input>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Description:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value2.desc"></b-form-input>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Amount Left:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value2.amount" type="number"></b-form-input>
                  </b-form-group>

                  <b-form-group horizontal
                                label="Cost:"
                                label-class="text-sm-right">
                    <b-form-input v-model="value2.cost" type="number"></b-form-input>
                  </b-form-group>
                  <div slot="modal-footer">
                    <button type="button" class="btn btn-primary" v-on:click="saveRewardItemChanges(key2, value2)">Save Changes</button>
                  </div>
                </b-modal>
              </b-list-group-item>

            </div>
      </div>
    </b-list-group>

    <br>
    <br>
  </div>

  <div class="admin" v-else-if="logged_in && user_data.admin && view=='requests'">
    <h1> Admin Dashboard </h1>
    <button class="btn btn-primary" v-on:click="switchView('products')">View Products</button>
    <button class="btn btn-primary" v-on:click="switchView('rewards')">View Items</button>
    <br>
    <h2> Requests </h2>

  </div>

  <div v-else>
    <h1> You will need admin rights to access this page. </h1>
  </div>

</template>

<script>
import firebase from 'firebase';
import router from '../router';

export default {
  name: 'admin',
  data () {

    this.getAllProducts();
    this.getUserData(); //REMOVE AFTER TESTS
    this.getAllItems();
    return {
      product_msg: "",
      rewardItem_msg: "",
      email: "",
      password: "",
      logged_in: true, //DEFAULT: False
      user_data: {},
      view: "products",
      product: {},
      products_list: {},
      item: {},
      rewards_list: {}
    }

  },
  methods: {
    test: function(test){
      console.log(test);
    },
    getAllProducts: function() {
      var obj = this;
      firebase.database().ref('products').once('value').then(function(snapshot) {
        obj.products_list = snapshot.val();
        console.log(obj.products_list);
      });
    },
    getAllItems: function() {
      var obj = this;
      firebase.database().ref('rewards').once('value').then(function(snapshot) {
        obj.rewards_list = snapshot.val();
        console.log(obj.rewards_list);
      });
    },
    createProduct: function(product){
      //create a product
      firebase.database().ref('products/').push({
        name: product.name,
        desc: product.desc,
        link: product.link,
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
        link: value.link
      });
      this.getAllProducts();
    },

    deleteProduct: function(key){
      //delete a product
      firebase.database().ref('products/' + key).remove();
      this.getAllProducts();
    },

    createRewardItem: function(item){
      //create reward item
      firebase.database().ref('rewards/').push({
        name: item.name,
        desc: item.desc,
        amount: item.amount,
        cost: item.cost
      }).catch(function(error) {
          alert("Oops. " + err.message);
          console.log(error);
      });

      this.getAllItems();
      this.rewardItem_msg = "Created!";
    },
    saveRewardItemChanges: function(key, value){
      //edit an item
      firebase.database().ref('rewards/' + key).update({
        name: value.name,
        desc: value.desc,
        amount: value.amount,
        cost: value.cost
      });
      this.getAllItems();
    },

    deleteRewardItem: function(key){
      //delete item
      firebase.database().ref('rewards/' + key).remove();
      this.getAllItems();
    },

    switchView: function(new_view){
      this.view = new_view;

    },
    getUserData: function(){
      var obj = this;
      var userid = firebase.auth().currentUser.uid;
      //Retrieve User Data
      firebase.database().ref('users/'+userid).once('value').then(function(snapshot) {
          obj.user_data = snapshot.val();
      });
    },
    signIn: function() {
      var obj = this;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          //only sign them in if email is verified
          if(user.emailVerified){
            obj.logged_in = true;
            obj.getUserData();

          }else{
            firebase.auth().signOut().then(function() {
                //sign user out
                alert('Please verify your email first.');
            }).catch(function(error) {
              alert("Oops. " + err.message)
                console.log(error);
            });
          }
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      );
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
