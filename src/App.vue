<template>
  <div id="app">

    <app-header></app-header>

    <br>
    <router-view></router-view>

    <footer class="footer-basic-centered">

			<p class="footer-links">
				<a href="http://omcn.tech/">About Us</a>
				·
				<a href="mailto:contact@omcn.tech">Contact Us: contact@omcn.tech</a>
			</p>

			<p class="footer-company-name">Omicron Brokerage Group Inc. &copy; 2018</p>

		</footer>

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
    methods: {

    }

  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.footer-basic-centered{
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

/* If you don't want the footer to be responsive, remove these media queries */

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
}
</style>
