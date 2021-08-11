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
    <div class="home-container">
      <div class="user-info"></div>
    </div>
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
      this.$router.push('login');
    },
    logout(): void {
      this.$store.dispatch('logout');
    },
  },
  watch: {
    user(value) {
      const info = document.getElementsByClassName('user-info')[0];
      info.innerHTML = JSON.stringify(value)
        .replace(/,/g, ',<br />')
        .replace(/{/g, '{<br />')
        .replace(/}/g, '<br />}');
    },
  },
  mounted() {
    const info = document.getElementsByClassName('user-info')[0];
    info.innerHTML = JSON.stringify(this.user)
      .replace(/,/g, ',<br />')
      .replace(/{/g, '{<br />')
      .replace(/}/g, '<br />}');
  },
});
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 48px);
  width: 100%;
}
</style>
