<template>
  <div class="login">
    <h3>Sign In</h3>

    <v-form class="input-form"
     ref="form"
     lazy-validation>

     <v-text-field
       v-model="email"
       label="E-mail"
       v-on:keyup.enter="signIn"
       required>
     </v-text-field>

     <v-text-field
       v-model="password"
       :append-icon="show1 ? 'visibility_off' : 'visibility'"
       :type="show1 ? 'text' : 'password'"
       @click:append="show1 = !show1"
       v-on:keyup.enter="signIn"
       label="Password"></v-text-field>
     <router-link to="/forgot-password">Forgot your password?</router-link>

     <p>Don't have an account? <router-link to="/sign-up">Create one now</router-link></p>


     <v-btn
       color="success"
       v-on:click="signIn">
       Sign In
     </v-btn>

     <v-alert v-if="status == 'error'"
         :value="true"
         type="error">
         Oops. {{errormsg}}
     </v-alert>

    </v-form>

  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data: function() {
      return {
        show1: false,
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
  .input-form{
    margin: 10px 665px;
    width: 30%;
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
