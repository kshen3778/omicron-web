<template>


  <div class="admin" v-if="this.$parent.logged_in && this.$parent.user_data.admin">

    <h2> Requests </h2>
    <br>

    <button type="button" class="btn btn-info" v-on:click="getNonProcessedRequests()">Get Non-processed Requests</button>
    <button type="button" class="btn btn-info" v-on:click="getProcessedRequests()">Get Processed Requests</button>
    <button type="button" class="btn btn-info" v-on:click="getAllRequests()">View All Requests</button>
    <button type="button" class="btn btn-danger" v-on:click="deleteProcessedRequests()">Delete Processed Requests</button>
    <br>
    <br>

    <b-list-group>


      <div v-for="(value, key) in requests_list">
            <div v-if="value">
              <b-list-group-item>
                {{key}}
                <br>
                {{value.user_email}}
                <br>
                {{value.item_name}}
                <br>
                {{value.date}}
                <br>
                <button type="button" class="btn btn-primary" v-b-modal="''+key">Edit</button>

                <button type="button" class="btn btn-danger" v-if="!value.completed">Not Processed</button>
                <button type="button" class="btn btn-success" v-if="value.completed">Processed</button>


                <b-modal :id="''+key" :title="key">
                  <b-form-group horizontal
                                label="Email of Requester:"
                                label-class="text-sm-right">
                    <h4>{{value.user_email}}</h4>
                  </b-form-group>
                  <b-form-group horizontal
                                label="User ID of Requester:"
                                label-class="text-sm-right">
                    <h5> {{value.user_id}}</h5>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Item Requested:"
                                label-class="text-sm-right">
                    <h6> {{value.item_name}}</h6>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Item ID:"
                                label-class="text-sm-right">
                    <h5> {{value.item_id}}</h5>
                  </b-form-group>
                  <b-form-group horizontal
                                label="Address:"
                                label-class="text-sm-right">
                    <h5> {{value.user_address}}</h5>
                  </b-form-group>
                  <div slot="modal-footer">
                    <button type="button" class="btn btn-success" v-if="!value.completed" v-on:click="changeStatus(key, 'complete')">Mark as Processed</button>
                    <button type="button" class="btn btn-danger" v-if="value.completed" v-on:click="changeStatus(key, 'incomplete')">Change to Unprocessed</button>
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
  name: 'requestview',
  data () {

    this.getAllRequests();
    //this.getUserData(); //REMOVE AFTER TESTS
    return {
      requests_list: {},

    }

  },
  methods: {

    deleteProcessedRequests: function() {
      var obj = this;
      var ref = firebase.database().ref('requests');
      if(confirm("Are you sure?")){
        ref.orderByChild('completed').equalTo(true).on("value", function(snapshot){
          snapshot.forEach(function(childSnapshot) {
              //remove each child
              console.log("delete");
              ref.child(childSnapshot.key).remove();
              //obj.getAllRequests();
          });
        });
      }
    },

    getNonProcessedRequests: function() {
      var obj = this;
      firebase.database().ref('requests').orderByChild('completed').equalTo(false).on("value", function(snapshot){
        obj.requests_list = snapshot.val();
        console.log(obj.requests_list);
      });
    },

    getProcessedRequests: function(){
      var obj = this;
      firebase.database().ref('requests').orderByChild('completed').equalTo(true).on("value", function(snapshot){
        obj.requests_list = snapshot.val();
        console.log("Processed Requests: " + obj.requests_list);
      });
    },

    getAllRequests: function() {
      var obj = this;
      firebase.database().ref('requests').once('value').then(function(snapshot) {
        obj.requests_list = snapshot.val();
        console.log(obj.requests_list);
      });
    },

    changeStatus: function(key, status){

      if(status == "complete"){
        console.log("Mark as completed");
        //edit a request's status
        firebase.database().ref('requests/' + key).update({
          completed: true
        });
      }
      else{
        //edit a request's status
        firebase.database().ref('requests/' + key).update({
          completed: false
        });
      }

      //this.getAllRequests();
    },

    getUserData: function(){
      var obj = this;
      var userid = firebase.auth().currentUser.uid;
      //Retrieve User Data
      firebase.database().ref('users/'+userid).once('value').then(function(snapshot) {
          obj.user_data = snapshot.val();
      });
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
