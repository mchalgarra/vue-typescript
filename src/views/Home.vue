<template>
  <v-container class="pa-0 ma-0" fluid>
    <v-toolbar color="deep-purple" dark>
      <v-row class="pa-0 ma-0" justify="center" align="center">
        <v-col cols="2"></v-col>
        <v-col cols="8" style="text-align: center">
          <v-toolbar-title style="font-size: 1.4rem">
            Vue TypeScript
          </v-toolbar-title>
        </v-col>
        <v-col cols="2" style="text-align: right">
          <v-btn text @click="!!user ? logout() : login()">{{
            !!user ? 'Logout' : 'Login'
          }}</v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
  </v-container>
</template>

<script lang="ts">
import { IUserData } from '@/models/interfaces/user';
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  components: {},
  computed: {
    isDark(): boolean {
      return this.$store.getters.isDark;
    },
    user(): IUserData | null {
      return this.$store.getters.user;
    },
  },
  methods: {
    login(): void {
      console.log('Login');
      this.$router.push('login');
    },
    logout(): void {
      console.log('Logout');
    },
  },
});
</script>
