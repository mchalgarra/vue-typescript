<template>
  <v-app>
    <v-main>
      <router-view />
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        top
        right
      >
        {{ snackbar.text }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { ISnackbarData } from '@/models/interfaces/shared';

export default Vue.extend({
  name: 'App',
  computed: {
    snackbar(): ISnackbarData {
      return this.$store.getters.snackbar;
    },
  },
});
</script>
