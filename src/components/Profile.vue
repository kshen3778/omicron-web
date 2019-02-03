<template>
  <div class="profile">
    <h1> <b> Profile </b> </h1>
    <h2> Name: {{user_data.name}} </h2>
    <h2> Email: {{user_data.email}}</h2>
    <h2> Points: {{user_data.points}}</h2>

    <v-form
    class="input-form"
    ref="form"
    lazy-validation>
    <v-text-field
      v-model="user_data.name"
      label="Full Name"
      required>
    </v-text-field>

    <v-text-field
      v-model="user_data.address"
      label="Full Mailing Address"
      required>
    </v-text-field>

    <v-alert
      v-if="updateMsg != ''"
      :value="true"
      color="success"
      icon="check_circle"
      outline>
      {{updateMsg}}
    </v-alert>

    <br>

    <v-btn
      color="success"
      v-on:click="editProfile(user_data.name, user_data.address)">
      Save
    </v-btn>


    <v-btn
      color="error"
      v-on:click="logout()">
      Logout
    </v-btn>

    <v-btn
      color="warning"
      v-on:click="resetPassword()">
      Reset Password
    </v-btn>
  </v-form>
  </div>
</template>

<script>
import firebase from 'firebase';
import router from '../router';

export default {
  name: 'profile',
  data () {

    this.getUserData();
    return {
      nameMsg: '',
      addressMsg: '',
      updateMsg: '',
      user_data: {}
    }

  },
  methods: {
    getUserData: function(){
      var obj = this;
      var userid = firebase.auth().currentUser.uid;
      //Retrieve User Data
      firebase.database().ref('users/'+userid).once('value').then(function(snapshot) {
          obj.user_data = snapshot.val();
          console.log(obj.user_data);
      });
    },

    editProfile: function(newName, newAddress){
      var userid = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userid).update({
        name: newName,
        address: newAddress
      });
      this.updateMsg = "Profile Information Updated!";
    },

    /*editAddress: function(newAddress){
      var userid = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userid).update({
        address: newAddress
      });
      this.addressMsg = "Address Updated!";
    },

    editName: function(newName){
      var userid = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userid).update({
        name: newName
      });
      this.nameMsg = "Name Updated!";
    },*/

    resetPassword: function(){
      var auth = firebase.auth();
      var emailAddress = this.user_data.email;

      auth.sendPasswordResetEmail(emailAddress).then(function() {
          alert("Reset Link Has been sent to your address");
      }).catch(function(error) {
          alert("Oops. " + err.message)
          console.log(error);
      });
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    redirectToMain: function(){
      router.push('hello');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-form{
    /*margin: 10px 645px;*/
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    padding: 15px;
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
