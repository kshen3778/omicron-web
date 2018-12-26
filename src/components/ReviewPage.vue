<template>
  <div>
    <div v-for="product in productinfo">
        <img class="card-img-top" style="width:30%;":src="product.imgurl">
        <div class="card-body">
          <h2 class="card-title">{{product.name}}</h2>
          <h2 class="card-text">{{product.desc}}</h2>
          <!--<h3><a :href="product.link" target="_blank" class="card-link">Submit Feedback</a></h3>-->
          <div v-if="allow_submission">
            <div id="typeform" style="width: 100%; height: 300px;"></div>
          </div>

          <br>
          <h2>Please allow up to 24-48 hours for points to be assigned after submitting feedback.</h2>
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
      allow_submission: false,
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

  updated: function () {
    var obj = this;

    console.log(obj.user_data);
    console.log("key: " + obj.productkey);
    console.log(obj.productinfo[obj.productkey]);

    axios.get('https://api.typeform.com/forms/mCn4ao/responses?page_size=1', {
       headers: {
         Authorization: 'bearer ' + process.env.TYPEFORM_TOKEN
       }
    })
    .then(function(response) {
      // JSON responses are automatically parsed.
      console.log(response.data.items[0]);
    });

    const embedElement = document.querySelector('#typeform');
    typeformEmbed.makeWidget(
      embedElement,
      'https://omcn.typeform.com/to/mCn4ao',
      {
        hideHeaders: true,
        hideFooter: true,
        opacity: 75,
        buttonText: "Take the survey!",
        onSubmit: function () {

          //once hidden elements are activated, query the first 25 and then search for one where the hidden userid matches current userid

          var productinfo = obj.productinfo[obj.productkey]

          axios.get('https://api.typeform.com/forms/mCn4ao/responses?page_size=1', {
             headers: {
               Authorization: 'bearer ' + process.env.TYPEFORM_TOKEN
             }
          })
          .then(function(response) {

            console.log(response.data.items[0]);
            var sub_id = response.data.items[0].response_id;
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


          });


        }
      }
    )
  },

  methods: {

    //returns false if user has already submitted a response in the last 72 hours.
    canSubmit: function(){
      var obj = this;
      //get current time minus one week
      var d = new Date();
      d.setDate(d.getDate() - 7);
      console.log(d);

      var userid = firebase.auth().currentUser.uid;

      firebase.database().ref('users/'+ userid +'/feedback').orderByChild("date").startAt(d.toLocaleString()).on("value", function(snapshot) {

          console.log(snapshot.val());
          if(snapshot.val() == null){
            obj.allow_submission = true;
          }else{
            //check if it's for this specific form
            snapshot.forEach(function(child){
              console.log(child.key, child.val());
              if(child.val().product_id == obj.productkey){
                obj.allow_submission = false;

              }
            });

            obj.allow_submission = true;

          }
      });


    },

    getUserData: function(){
      var obj = this;
      var userid = firebase.auth().currentUser.uid;
      //Retrieve User Data
      firebase.database().ref('users/'+userid).once('value').then(function(snapshot) {
          obj.user_data = snapshot.val();
          console.log(obj.user_data);
      });

    },

    getProductInfo: function(){
      var obj = this;
      console.log(obj.$route.params.id);
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
