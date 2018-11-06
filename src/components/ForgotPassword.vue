<template>
  <div class="sign-up">
    <p>Enter your email:</p>
    <input type="text" v-model="email" placeholder="Email" v-on:keyup.enter="resetPassword()"><br>
    <v-alert v-if="status == 'success'"
        :value="true"
        type="success">
        Please check your inbox for further instructions.
    </v-alert>

    <v-alert v-else-if="status == 'error'"
        :value="true"
        type="error">
        Oops. {{errormsg}}
    </v-alert>
    <button v-on:click="resetPassword()">Send Reset Link</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'forgotPassword',
    data: function() {
      return {
        email: '',
        status: '',
        errormsg: ''
      }
    },
    methods: {
      resetPassword: function() {
        var obj = this;
        var auth = firebase.auth();
        var emailAddress = this.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
          obj.status = "success";
        }).catch(function(error) {
          obj.status = "error";
          obj.errormsg = "This email does not exist.";
        });
      }
    }
  }
</script>

<style scoped>
  .signUp {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
