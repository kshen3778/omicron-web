<template>


  <div id="app">
    <v-app>

    <!--<app-header></app-header>-->
    <v-toolbar dark color="primary">
     <v-toolbar-title>Omicron</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items class="hidden-sm-and-down" v-if="loggedIn">
       <v-btn flat to="/">Dashboard</v-btn>
       <v-btn flat to="/rewards">Rewards</v-btn>
       <v-btn flat to="/profile">My Account</v-btn>
       <v-btn flat v-on:click="logout">Logout</v-btn>
     </v-toolbar-items>
   </v-toolbar>

    <br>
    <router-view class="Site-content"></router-view>

    <v-footer
    height="auto"
    color="primary lighten-1"
    >
    <v-layout
      justify-center
      row
      wrap>
      <v-btn
        v-for="link in links"
        :key="link[0]"
        color="white"
        :href="link[1]"
        flat
        round>
        <b>{{ link[0] }}</b>
      </v-btn>
      <v-flex
        primary
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12>
        &copy;2018 — <strong>Omicron Brokerage Group Inc.</strong>
      </v-flex>
    </v-layout>
  </v-footer>

  </v-app>

  </div>

</template>

<script>
  import Header from '@/components/Header'
  import firebase from 'firebase';
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    computed: {
      loggedIn: function(){
        var user = firebase.auth().currentUser;
        if(user){
          return true;
        }
        return false;
      }
    },
    data () {
      return {
        links: [
          ['Home', '/'],
          ['About Us', 'http://omcn.tech/'],
          ['Contact Us', 'mailto:contact@omcn.tech']
        ]
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

<style>


#app {
  text-align: center;
  color: #2c3e50;
  max-width: 100%;
  overflow-x: hidden;
}

.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}


/*.footer-basic-centered{
	background-color: #292c2f;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
	box-sizing: border-box;
	width: 100%;
	text-align: center;
	font: normal 18px sans-serif;
	padding: 45px;
	margin-top: 80px;
  box-shadow: 0 50vh 0 50vh #292c2f;
}

.footer-basic-centered .footer-company-motto{
	color:  #8d9093;
	font-size: 24px;
	margin: 0;
}

.footer-basic-centered .footer-company-name{
	color:  #8f9296;
	font-size: 14px;
	margin: 0;
}

.footer-basic-centered .footer-links{
	list-style: none;
	font-weight: bold;
	color:  #ffffff;
	padding: 35px 0 23px;
	margin: 0;
}

.footer-basic-centered .footer-links a{
	display:inline-block;
	text-decoration: none;
	color: inherit;
}


@media (max-width: 600px) {

	.footer-basic-centered{
		padding: 35px;
	}

	.footer-basic-centered .footer-company-motto{
		font-size: 18px;
	}

	.footer-basic-centered .footer-company-name{
		font-size: 12px;
	}

	.footer-basic-centered .footer-links{
		font-size: 14px;
		padding: 25px 0 20px;
	}

	.footer-basic-centered .footer-links a{
		line-height: 1.8;
	}
}*/
</style>
