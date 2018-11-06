<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email" v-on:keyup.enter="signIn"><br>
    <input type="password" v-model="password" placeholder="Password" v-on:keyup.enter="signIn"><br>
    <v-alert v-if="status == 'error'"
        :value="true"
        type="error">
        Oops. {{errormsg}}
    </v-alert>
    <button v-on:click="signIn">Login</button>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
    <p>Forgot your password ? You can <router-link to="/forgot-password">reset it</router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: '',
        status: '',
        errormsg: ''
      }
    },
    methods: {
      signIn: function() {
        var obj = this;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            //only sign them in if email is verified
            if(user.emailVerified){
              this.$router.replace('hello');
              location.reload();
            }else{
              firebase.auth().signOut().then(function() {
                  //sign user out
                  obj.status = "error";
                  obj.errormsg = "Please check your inbox and verify your email.";
              }).catch(function(error) {
                obj.status = "error";
                obj.errormsg = err.message;
              });
            }
          },
          (err) => {
            obj.status = "error";
            obj.errormsg = "User does not exist.";
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
