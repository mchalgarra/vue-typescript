<template>
  <div>Auth</div>
</template>

<script lang="ts">
import Vue from "vue";
import { IUserData } from "@/models/interfaces/user";

export default Vue.extend({
  name: "Auth",
  props: {
    isSignUp: Boolean,
  },
  computed: {
    user(): IUserData | null {
      return this.$store.getters.user;
    },
  },
  beforeMount() {
    if (this.user) {
      this.$router.push("/");
    }
    console.log(this.isSignUp);
  },
});
</script>
