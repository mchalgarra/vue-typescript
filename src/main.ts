import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const authPersistence = {
  local: firebase.auth.Auth.Persistence.LOCAL,
  session: firebase.auth.Auth.Persistence.SESSION,
  none: firebase.auth.Auth.Persistence.NONE,
};

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogin', { id: user.uid });
      }
    });
  },
}).$mount('#app');
