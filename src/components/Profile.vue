<template>
  <div class="profile">
    <h1>{{ msg }}</h1>
    <h2> User email: {{user_data.email}}</h2>
    <h2> Points: {{user_data.points}}</h2>
    <button class="btn btn-primary" v-on:click="logout">Logout</button>
    <button class="btn btn-primary" v-on:click="redirectToMain()">Exit</button>
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
      msg: 'Profile',
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
      });

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
