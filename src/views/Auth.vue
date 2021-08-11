<template>
  <v-container class="pa-0 ma-0 auth-container" fluid>
    <div class="image-container">
      <img
        id="backgroundImageLogin"
        class="background-image"
        v-if="!isSignUp"
        src="../assets/images/login-background-small.jpg"
        alt="Auth Image"
      />
      <img
        id="backgroundImageSignUp"
        class="background-image"
        v-else
        src="../assets/images/signup-background-small.jpg"
        alt="Auth Image"
      />
      <div class="gradient-overlay"></div>
    </div>
    <v-card
      elevation="0"
      class="pa-0 ma-0 auth-card"
      :class="isSignUp ? 'sign-up' : 'login'"
      tile
    >
      <v-card-title class="mt-10 auth-card-title">{{
        isSignUp ? 'Sign Up' : 'Login'
      }}</v-card-title>

      <v-form ref="authForm" class="auth-form">
        <v-text-field
          v-if="isSignUp"
          v-model="name"
          label="Name"
          :color="color"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          :color="color"
          type="email"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :color="color"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          v-if="isSignUp"
          v-model="confirmPassword"
          label="Confirm password"
          :color="color"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="confirmPasswordRules"
          @click:append="showConfirmPassword = !showConfirmPassword"
        ></v-text-field>

        <v-checkbox
          v-if="isSignUp"
          v-model="isTermsAccepted"
          label="I accept the Terms and Conditions of use"
          style="align-self: start"
        ></v-checkbox>
        <v-checkbox
          v-else
          v-model="isRememberActive"
          label="Remember"
          style="align-self: start"
        ></v-checkbox>

        <v-btn
          class="mb-4 mt-2 toggle-screen-button"
          :color="color"
          :dark="isFormValid"
          :disabled="!isFormValid"
          :loading="isLoading"
          @click="isSignUp ? signUp() : login()"
        >
          {{ isSignUp ? 'Register' : 'Login' }}
        </v-btn>
      </v-form>

      <v-btn
        text
        class="mb-4 toggle-screen-button"
        :color="color"
        :disabled="isLoading"
        @click="switchScreen()"
      >
        {{ isSignUp ? 'Already has an account?' : "Don't have an account?" }}
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { IUserData } from '@/models/interfaces/user';

interface Rule {
  (v: string): boolean | string;
}

export default Vue.extend({
  name: 'Auth',
  props: {
    isSignUp: Boolean,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isTermsAccepted: false,
      isRememberActive: false,
      showPassword: false,
      showConfirmPassword: false,
      nameRegex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      passwordRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    };
  },
  computed: {
    isLoading(): boolean {
      return this.$store.getters.isLoading;
    },
    user(): IUserData | null {
      return this.$store.getters.user;
    },
    color(): string {
      return this.isSignUp ? '#0a8ea9' : '#0767d0';
    },
    nameRules(): Rule[] {
      return [
        (v: string) => !!v || 'Name is required!',
        (v: string) => this.nameRegex.test(v) || 'Name not valid!',
      ];
    },
    emailRules(): Rule[] {
      return [
        (v: string) => !!v || 'E-mail is required!',
        (v: string) => this.emailRegex.test(v) || 'E-mail not valid!',
      ];
    },
    passwordRules(): Rule[] {
      return [
        (v: string) => !!v || 'Password is required!',
        (v: string) =>
          this.passwordRegex.test(v) ||
          'Min 8 characters, 1 lowercase letter, 1 capital letter, 1 number',
      ];
    },
    confirmPasswordRules(): Rule[] {
      return [
        (v: string) => !!v || 'Confirm password is required!',
        (v: string) => v === this.password || "Passwords doesn't match!",
      ];
    },
    isFormValid(): boolean {
      return (
        (!this.isSignUp || this.nameRegex.test(this.name)) &&
        this.emailRegex.test(this.email) &&
        this.passwordRegex.test(this.password) &&
        (!this.isSignUp || this.confirmPassword === this.password) &&
        (!this.isSignUp || this.isTermsAccepted)
      );
    },
  },
  methods: {
    setImage() {
      const image = document.getElementById(
        this.isSignUp ? 'backgroundImageSignUp' : 'backgroundImageLogin',
      ) as HTMLImageElement;

      if (image && image.src.includes('small')) {
        const loadImage = document.createElement('img');

        loadImage.onload = () => {
          image.src = loadImage.src;
        };

        setTimeout(() => {
          loadImage.src = this.isSignUp
            ? require('@/assets/images/signup-background.jpg')
            : require('@/assets/images/login-background.jpg');
        }, 50);
      }
    },
    switchScreen(): void {
      this.$router.push(this.isSignUp ? 'login' : 'sign-up');
    },
    async signUp(): Promise<void> {
      const payload = {
        user: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
      };

      const didSignUp: boolean = await this.$store.dispatch('signUp', payload);

      if (didSignUp) {
        this.$router.push('/');
      }
    },
    async login(): Promise<void> {
      const payload = {
        user: {
          email: this.email,
          password: this.password,
        },
        remember: this.isRememberActive,
      };

      const didLogin: boolean = await this.$store.dispatch('login', payload);

      if (didLogin) {
        this.$router.push('/');
      }
    },
  },
  watch: {
    isSignUp(): void {
      setTimeout(() => {
        this.setImage();
      }, 50);
    },
  },
  mounted() {
    this.setImage();
  },
  beforeMount() {
    if (this.user) {
      this.$router.push('/');
    }
  },
});
</script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  height: 100vh;
  width: 100vw;

  & .image-container {
    position: relative;

    flex: 1;
    height: 100%;

    & img {
      height: 100%;
      width: 100%;

      object-fit: cover;
    }

    & .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;

      height: 100%;
      width: 100%;

      background: linear-gradient(
        90deg,
        rgba(32, 32, 32, 0.6) 0%,
        rgba(32, 32, 32, 0.1) 69.95%
      );
    }
  }

  & .auth-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 350px;
    height: 100%;

    box-shadow: -4px 0 4px 2px rgba(0, 0, 0, 0.2) !important;

    & .auth-form {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 74%;

      & .v-text-field {
        width: 100%;
      }
    }

    &.login {
      & .auth-card-title {
        color: #0767d0;
        font-size: 1.4rem;
      }
    }

    &.sign-up {
      & .auth-card-title {
        color: #0a8ea9;
        font-size: 1.4rem;
      }
    }
  }
}
</style>
