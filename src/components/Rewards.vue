<template>
  <div class="hello">

    <h1>Rewards Marketplace</h1>
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <p> You have <b> {{user_data.points}}</b> points remaining. </p>
    </ul>

    <div v-for="(value, key) in items">
          <div v-if="value" class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{value.name}}</h5>
              <p class="card-text">{{value.desc}}</p>
              <p class="card-text">Redeem for <b>{{value.cost}}</b> points.</p>
              <p class="card-text">Amount Left: {{value.amount}}</p>
              <button type="button" class="btn btn-primary" v-b-modal="''+key">
                Details
              </button>

              <b-modal :id="''+key" :title="value.name">
                <p class="my-4">{{value.desc}}</p>
                <p class="card-text">Redeem for <b>{{value.cost}}</b> points.</p>
                <p class="my-4">Amount Left: {{value.amount}}</p>
                <div slot="modal-footer">
                  <button type="button" class="btn btn-primary" v-on:click="redeem(key)">Redeem</button>
                 </div>
              </b-modal>
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
  name: 'rewards',
  data () {

    this.getAllItems();
    this.getUserData();
    return {
      msg: 'Rewards Marketplace',
      items: null,
      user_data: null
    }
  },
  methods: {
    getAllItems: function() {
      var obj = this;
      firebase.database().ref('rewards').once('value').then(function(snapshot) {
        obj.items = snapshot.val();
      });
    },

    getUserData: function(){
      var obj = this;
      var userid = firebase.auth().currentUser.uid;
      //Retrieve User Data
      firebase.database().ref('users/'+userid).once('value').then(function(snapshot) {
          obj.user_data = snapshot.val();
      });

    },

    redeem: function(key) {
      var obj = this;
      var userid = firebase.auth().currentUser.uid;

      //Find the time
      firebase.database().ref('rewards/' + key).once('value').then(function(snapshot) {
        var item = snapshot.val();
        //Check the item count and user's points
        if(item.amount > 0 && obj.user_data.points >= item.cost){

          //Decrease the Count
          firebase.database().ref('rewards/' + key).update({
            amount: item.amount - 1
          });

          //Subtract Points
          firebase.database().ref('users/' + userid).update({
            points: obj.user_data.points - item.cost
          });

          //Create request
          firebase.database().ref('requests/').push({
            user_id: userid,
            user_email: obj.user_data.email,
            item_id: key,
            item_name: item.name,
            completed: false
          });

          obj.getAllItems();
          obj.getUserData();
          alert("Your request to redeem this item has been sent. You will receive an update shortly.")

        } else {
          //Out of stock
          alert("No more remaining items or you do not have enough points.");
        }
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
