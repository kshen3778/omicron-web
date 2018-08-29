<template>

  <div class="login" v-if="!logged_in">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button v-on:click="signIn">Log In</button>
  </div>

  <div class="admin" v-else-if="logged_in && user_data.admin">
    <h1> Admin Dashboard </h1>
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

    return {
      email: "",
      password: "",
      logged_in: false,
      user_data: null
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
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
