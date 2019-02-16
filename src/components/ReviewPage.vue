<template>
  <div>
    <div v-for="product in productinfo">
        <img class="card-img-top" style="width:30%;":src="product.imgurl">
        <div class="card-body">
          <h2 class="card-title">{{product.name}}</h2>
          <h2 class="card-text">{{product.desc}}</h2>
          <!--<h3><a :href="product.link" target="_blank" class="card-link">Submit Feedback</a></h3>-->
          <div v-if="allow_submission">
            <div id="typeform" style="width: 100%; height: 400px;"></div>
            <br>
          </div>

          <div v-if="!allow_submission">
            <h2>Your response has been submitted.</h2>
          </div>

        </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import * as typeformEmbed from '@typeform/embed';
import axios from 'axios';

export default {
  name: 'reviewpage',

  data() {


    return {
      allow_submission: true,
      productkey: "",
      productinfo: {},
      user_data: {}
    }
  },

  created() {
    this.getProductInfo();
    this.getUserData();
    this.canSubmit();
  },

  mounted: function () {
    this.loadForm();
  },

  updated: function () {
    this.loadForm();
  },

  methods: {

    loadForm: function(){
      var obj = this;
      var productinfo = obj.productinfo[obj.productkey]
      var userid = firebase.auth().currentUser.uid;

      const embedElement = document.querySelector('#typeform');
      typeformEmbed.makeWidget(
        embedElement,
        productinfo.link + "?user_id="+userid,
        {
          hideHeaders: true,
          hideFooter: true,
          opacity: 75,
          buttonText: "Take the survey!",
          onSubmit: function () {
            console.log("ON SUBMIT CALLED");
            //TODO: once hidden elements are activated, query the first 10 and then search for one where the hidden userid matches current userid

            var link = productinfo.link.split("?")[0].split("/");
            var form_id = link[link.length - 1] //get the form id from product link

            //get all responses for this form
            axios.get('https://api.typeform.com/forms/' + form_id + '/responses?page_size=10', {
               headers: {
                 Authorization: 'bearer ' + process.env.TYPEFORM_TOKEN
               }
            })
            .then(function(response) {

              var found = false;
              //Query first 10 elements
              for(var i = 0; i<response.data.items.length; i++){

                if(found){ //the first element with matching user id is found already
                  break;
                }

                //check the hidden user id
                if(response.data.items[i].hidden){
                  if(response.data.items[i].hidden.user_id == userid){
                    var sub_id = response.data.items[i].response_id; //response id
                    var user_id = response.data.items[i].hidden.user_id;
                    found = true;
                    //Create Feedback requests
                    firebase.database().ref('feedback/' + sub_id).set({
                          user_id: firebase.auth().currentUser.uid,
                          user_email: obj.user_data.email,
                          user_name: obj.user_data.name,
                          product_id: obj.productkey,
                          product_name: productinfo.name,
                          product_form_link: productinfo.link,
                          date: new Date().toLocaleString()
                    });

                    //Create feedback subrequests under user
                    firebase.database().ref('users/'+ firebase.auth().currentUser.uid +'/feedback/' + sub_id).set({
                         product_id: obj.productkey,
                         product_name: productinfo.name,
                         product_form_link: productinfo.link,
                         date: new Date().toLocaleString()
                    });

                    //Add Points
                    console.log("Points: " + productinfo.points);
                    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                      points: obj.user_data.points + parseInt(productinfo.points)
                    });
                  }
                }
              }


            });


          }
        }
      )
    },

    //sets allow_submission to false if user has already submitted a response in the last 72 hours.
    canSubmit: function(){
      var obj = this;
      //get current time minus 3 days
      var d = new Date();
      d.setDate(d.getDate() - 3);

      var userid = firebase.auth().currentUser.uid;

      firebase.database().ref('users/'+ userid +'/feedback').orderByChild("date").startAt(d.toLocaleString()).on("value", function(snapshot) {

          if(snapshot.val() == null){
            obj.allow_submission = true;
          }else{
            //check if it's for this specific form
            snapshot.forEach(function(child){
              if(child.val().product_id == obj.productkey){
                obj.allow_submission = false;
              }
            });


          }
      });


    },

    getUserData: function(){
      var obj = this;
      var userid = firebase.auth().currentUser.uid;
      //Retrieve User Data
      firebase.database().ref('users/'+userid).once('value').then(function(snapshot) {
          obj.user_data = snapshot.val();
      });

    },

    getProductInfo: function(){
      var obj = this;
      firebase.database().ref('products').orderByChild('id').equalTo(obj.$route.params.id).on("value", function(snapshot) {
          console.log(snapshot.val());
          obj.productinfo = snapshot.val();
          obj.productkey = Object.keys(snapshot.val())[0];;
      });
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

.card-img-top {
    width: 100%;
    height: 12vw;

}
</style>
