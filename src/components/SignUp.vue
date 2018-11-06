<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input type="text" v-model="email" placeholder="Email" v-on:keyup.enter="signUp"><br>
    <input type="password" v-model="password" placeholder="Password" v-on:keyup.enter="signUp"><br>
    <input type="text" v-model="name" placeholder="Full Name" v-on:keyup.enter="signUp"><br>
    <input type="text" v-model="address" placeholder="Full Mailing Address" v-on:keyup.enter="signUp"><br>

    <v-alert v-if="status == 'success'"
        :value="true"
        type="success">
        Please check your inbox and verify your email.
    </v-alert>

    <v-alert v-else-if="status == 'error'"
        :value="true"
        type="error">
        Oops. {{errormsg}}
    </v-alert>

    <button v-on:click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function() {
      return {
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
