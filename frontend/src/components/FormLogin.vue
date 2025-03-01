<template>
  <div>
    <b-card id="cardLogin" class="scale-in-bl">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="formLogin">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="blob">
          <path
            fill="#41B883"
            d="M66.2,-49.1C81.5,-33.5,86.8,-6.2,79.8,15.6C72.7,37.5,53.3,53.9,30.9,65.1C8.5,76.2,-16.9,81.9,-36.2,73.3C-55.5,64.7,-68.8,41.7,-70.8,19.9C-72.8,-2,-63.6,-22.7,-49.9,-37.8C-36.2,-53,-18.1,-62.7,3.6,-65.6C25.4,-68.5,50.8,-64.6,66.2,-49.1Z"
            transform="translate(100 100)"
          />
        </svg>

        <h1 class="text-center mb-3">Login</h1>
        <h2 class="text-center mb-4">Welcome back!</h2>
        <!-- <b-img src="../assets/images/logo.png" fluid class="logoLogin mb-4" /> -->
        <div class="d-flex justify-content-center mb-4">
          <img src="../assets/images/google.png" fluid class="icons" />
          <img src="../assets/images/github.png" fluid class="icons mx-4" />
        </div>
        <span class="text-center mb-4 other-account">Or log in with your account</span>
        <b-form-group id="input-group-1" label-for="email">
          <b-form-input
            id="email"
            class="input"
            v-model="form.email"
            type="email"
            placeholder="E-mail"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="passord"
            class="input"
            v-model="form.name"
            placeholder="Password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <div class="d-flex justify-content-between flex-wrap">
          <b-form-checkbox value="remember" class="remember">
            Remember password
          </b-form-checkbox>
          <div>
            <router-link to="/recover" class="forgotPassword">
              Forgot password?
            </router-link>
          </div>
        </div>

        <!-- <div class="d-flex justify-content-center mt-3">
          <b-button type="submit" variant="primary" class="btn-login"
            >Entrar <font-awesome-icon icon="arrow-right" class="arrow"
          /></b-button>
        </div> -->

        <div class="d-flex justify-content-center mt-3">
          <a href="#">
            <font-awesome-icon icon="arrow-right" class="arrow-btn" />
          </a>
        </div>

        <div class="d-flex justify-content-center flex-wrap mt-4 register">
          <span class="mr-2">Don't have an account yet?</span>
          <router-link to="/register" class="createAccount">Create account</router-link>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style>
@import "../assets/css/animations.css";
@import "../assets/css/variables.css";
@import "../assets/css/fonts.css";
@import "bootstrap/dist/css/bootstrap.css";
body {
  font-family: "Open Sans", sans-serif !important;
}

#cardLogin {
  border-radius: 15px;
  box-shadow: 0px 0px 10px #999;
  max-width: 100%;
  margin: 2rem auto;
}

#formLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem;
  position: relative;
}

#formLogin h1 {
  color: #41b883;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
}

#formLogin h2 {
  font-size: 1.2rem;
  color: #555;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}

#formLogin .other-account {
  color: #999;
}

#formLogin .icons {
  width: 80px;
  cursor: pointer;
  margin-bottom: 1rem;
}

#formLogin .input {
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

#formLogin .remember {
  color: #555;
}

#formLogin .blob {
  position: absolute;
  top: -10%;
  left: -8%;
  width: 120px;
  opacity: 0.2;
}

.forgotPassword {
  color: #999;
  text-decoration: none;
}

.forgotPassword:hover {
  color: #41b883;
  transition: 0.5s ease-in-out;
}

.arrow-btn {
  width: 80px;
  border-radius: 15px;
  background: #41b883;
  color: #fff;
  font-size: 45px;
  padding: 8px;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25);
}

.arrow-btn:hover {
  background: #83c5be;
  transition: 0.5s ease-in-out;
  box-shadow: none;
}

.register span {
  color: #555;
}

.register .createAccount {
  color: #41b883;
  text-decoration: none;
}

.register .createAccount:hover {
  color: #83c5be;
  transition: 0.5s ease-in-out;
}
</style>
