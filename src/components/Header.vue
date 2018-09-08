<template>
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/hello">Omicron</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="#/hello">Dashboard</b-nav-item>
        <b-nav-item href="#/rewards">Rewards</b-nav-item>
      </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="loggedIn">
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <em>My Account</em>
              </template>
              <b-dropdown-item href="#/profile">Profile</b-dropdown-item>
              <b-dropdown-item v-on:click="logout">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
</template>

<script>
import firebase from 'firebase';
export default {



  computed: {
    loggedIn: function(){
      var user = firebase.auth().currentUser;
      if(user){
        return true;
      }
      return false;
    }
  },

  methods: {

    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
      location.reload();
    }
  }
}
</script>
