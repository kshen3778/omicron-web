<template>

  <div class="admin" v-if="this.$parent.logged_in && this.$parent.user_data.admin">
    <h2> Search Users </h2>
    <b-card bg-variant="light">
        <b-form-group horizontal breakpoint="lg" label="Search" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0">
            <b-form-group horizontal
                          label="Email:"
                          label-class="text-sm-right">
              <b-form-input v-model="useremail" type="email"></b-form-input>
            </b-form-group>

            <b-form-group horizontal>
              <button class="btn btn-primary" v-on:click="searchUser(useremail)">Search</button>
            </b-form-group>

        </b-form-group>

    </b-card>

    <div v-for="(value, key) in user">
      <div v-if="value">
        <b-list-group-item>
          {{key}}
          <br>
          {{value.email}}
          <br>
          Points: {{value.points}}
          <br>
          Address: {{value.address}}
          <br>
          
          <button type="button" class="btn btn-primary" v-b-modal="''+key">Edit</button>

          <b-modal :id="''+key" :title="key">
            <b-form-group horizontal
                          label="Add Points:"
                          label-class="text-sm-right">
              <b-form-input v-model="points"></b-form-input>
            </b-form-group>
            <div slot="modal-footer">
              <button type="button" class="btn btn-primary" v-on:click="addPoints(key, value.points, points)">Add points</button>
            </div>
          </b-modal>
        </b-list-group-item>

      </div>
    </div>

    <br>
    <br>
  </div>


</template>

<script>
import firebase from 'firebase';
import router from '../router';

export default {
  name: 'userview',
  data () {

    this.getUserData(); //REMOVE AFTER TESTS
    return {
      rewardItem_msg: "",
      email: "",
      password: "",
      logged_in: true, //DEFAULT: False
      user_data: {},
      user: {},
      points: 0,
      useremail: ""
    }

  },
  methods: {

    searchUser: function(userEmail) {
      console.log(userEmail);
      var obj = this;
      firebase.database().ref('users').orderByChild('email').equalTo(userEmail).on("value", function(snapshot){
        obj.user = snapshot.val();
        console.log(obj.user);
      });
    },

    addPoints: function(key, currentPoints, points) {
      if(!isNaN(currentPoints) && !isNaN(points)){
        var currentPoints = parseInt(currentPoints);
        var points = parseInt(points);
        firebase.database().ref('users/' + key).update({
          points: currentPoints + points
        });
      }
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
