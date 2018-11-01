<template>
  <div class="hello">

    <h1>Rewards Marketplace</h1>
    <br>
    <ul>
      <h3> You have <b> {{user_data.points}}</b> points remaining. </h3>
    </ul>

    <div v-for="items in groupedItems" class="row p-5">

        <div v-for="value in items" class="col-lg-4">

              <div v-if="value" class="card mx-auto">
                <img class="card-img-top" :src="value[1].imgurl">
                <div class="card-body">
                  <h5 class="card-title">{{value[1].name}}</h5>
                  <p class="card-text">{{value[1].desc}}</p>
                  <p class="card-text">Redeem for <b>{{value[1].cost}}</b> points.</p>
                  <p class="card-text">Amount Left: {{value[1].amount}}</p>
                  <button type="button" class="btn btn-primary" v-b-modal="''+ value[0]">
                    Details
                  </button>

                  <b-modal :id="''+value[0]" :title="value[1].name">
                    <p class="my-4">{{value[1].desc}}</p>
                    <p class="my-4">Redeem for <b>{{value[1].cost}}</b> points.</p>
                    <p class="my-4">Amount Left: {{value[1].amount}}</p>
                    <div slot="modal-footer">
                      <button type="button" class="btn btn-primary" v-on:click="redeem(value[0])">Redeem</button>
                     </div>
                  </b-modal>
                </div>
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
      items: {},
      user_data: {}
    }
  },
  computed: {
    groupedItems: function() {
      var obj = this;
      var result = Object.keys(obj.items).map(function(key) {
        return [key, obj.items[key]];
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
            user_address: obj.user_data.address,
            item_id: key,
            item_name: item.name,
            completed: false,
            date: new Date().toLocaleString()
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

.card-img-top {
    width: 100%;
    height: 12vw;

}
</style>
