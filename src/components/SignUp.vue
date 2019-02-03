<template>
  <div class="sign-up">
    <br>
    <h3>Let's create a new account !</h3>
    <br>

    <v-form class="input-form"
     ref="form"
     lazy-validation>

     <v-text-field
       v-model="name"
       label="Full Name"
       v-on:keyup.enter="signUp"
       required>
     </v-text-field>

     <v-text-field
       v-model="email"
       label="E-mail"
       v-on:keyup.enter="signUp"
       required>
     </v-text-field>

     <v-text-field
       v-model="address"
       label="Full Mailing Address"
       v-on:keyup.enter="signUp"
       required>
     </v-text-field>

     <v-text-field
       v-model="password"
       :append-icon="show1 ? 'visibility_off' : 'visibility'"
       :type="show1 ? 'text' : 'password'"
       @click:append="show1 = !show1"
       v-on:keyup.enter="signUp"
       hint="At least 6 characters"
       label="Password"
     ></v-text-field>

     <v-btn
       color="success"
       v-on:click="signUp">
       Sign Up
     </v-btn>

    </v-form>

    <v-alert class="input-form" v-if="status == 'success'"
        :value="true"
        type="success">
        Please check your inbox and verify your email.
    </v-alert>

    <v-alert class="input-form" v-else-if="status == 'error'"
        :value="true"
        type="error">
        Oops. {{errormsg}}
    </v-alert>

    <p align="center"> Already have an account? <router-link to="/login">Login</router-link> </p>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function() {
      return {
        show1: false,
        email: '',
        password: '',
        name: '',
        address: '',
        status: '',
        errormsg: ''
      }
    },
    methods: {
      signUp: function() {
        var obj = this;
        var name = this.name;
        var address = this.address;
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
            //Email verification
            user.sendEmailVerification().then(function() {
                  // Email sent.
                  //Save user in database
                  firebase.database().ref('users/'+user.uid).set({
                        email: user.email,
                        name: name,
                        address: address,
                        points: 0,
                        admin: false
                  }).catch(function(error){
                        obj.status = "error";
                        obj.errormsg = error.message;
                  });

                  firebase.auth().signOut().then(function() {
                      obj.status = "success";
                  }).catch(function(error) {
                      obj.status = "error";
                      obj.errormsg = error.message;
                  });

            }).catch(function(error) {
                  // An error happened.
                  obj.status = "error";
                  obj.errormsg = error.message;
            });

            //this.$router.replace('hello')

          },
          (err) => {
            obj.status = "error";
            obj.errormsg = err.message;
          }
        );
      }
    }
  }
</script>

<style scoped>
  .input-form {
    margin-left: auto;
    margin-right: auto;
    width: 30%;
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
