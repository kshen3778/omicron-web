<template>
  <div class="profile">
    <h1> <b> Profile </b> </h1>
    <h2> Full Name: {{user_data.name}} </h2>
    <h2> User email: {{user_data.email}}</h2>
    <h2> Points: {{user_data.points}}</h2>

    <b-card bg-variant="light">

        <b-form-group horizontal label="Edit Full Name:" label-class="text-sm-right">
                <b-form-input v-model="user_data.name" type="text"></b-form-input>
        </b-form-group>

        <b-form-group horizontal>
                <button class="btn btn-primary" v-on:click="editName(user_data.name)">Save Name</button>
        </b-form-group>

        <h3>{{ nameMsg }}</h3>
    </b-card>

    <b-card bg-variant="light">

        <b-form-group horizontal label="Edit Full Address:" label-class="text-sm-right">
                <b-form-input v-model="user_data.address" type="text"></b-form-input>
        </b-form-group>

        <b-form-group horizontal>
                <button class="btn btn-primary" v-on:click="editAddress(user_data.address)">Save Address</button>
        </b-form-group>

        <h3>{{ addressMsg }}</h3>
    </b-card>

    <br>
    <br>

    <button class="btn btn-primary" v-on:click="logout">Logout</button>
    <button class="btn btn-primary" v-on:click="resetPassword()">Reset Password</button>
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

    editAddress: function(newAddress){
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
    },

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
