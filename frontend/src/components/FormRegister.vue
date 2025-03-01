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

        <h1 class="text-center mb-3">Sign Up</h1>
        <h2 class="text-center mb-4">Register with:</h2>
        <!-- <img src="../assets/images/logo.png" fluid class="logoLogin mb-4" /> -->
        <div class="d-flex justify-content-center mb-4">
          <img src="../assets/images/google.png" fluid class="icons" />
          <img src="../assets/images/facebook.png" fluid class="icons mx-4" />
          <img src="../assets/images/twitter.png" fluid class="icons" />
        </div>
        <span class="text-center mb-4 other-account">Or create your own account</span>
        <b-form-group id="input-group-1" label-for="email">
          <b-form-input
            id="name"
            class="input"
            v-model="form.name"
            type="text"
            placeholder="Full name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label-for="email">
          <b-form-input
            id="email"
            class="input"
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="password"
            class="input"
            v-model="form.password"
            placeholder="Password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <div class="d-flex justify-content-start flex-wrap">
          <b-form-checkbox value="remember" class="remember">
            I have read and agree to the terms of use
          </b-form-checkbox>
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
          <span class="mr-2">Already have an account?</span>
          <a @click="$router.go(-1)" class="loginAccount">Login</a>
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

body {
  font-family: "Open Sans", sans-serif !important;
}

#cardLogin {
  border-radius: 15px;
  box-shadow: 0px 0px 10px var(--gray);
}

#formLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  position: relative;
}

#formLogin h1 {
  color: var(--primary);
  font-weight: 700;
  font-family: "Poppins", sans-serif;
}

#formLogin h2 {
  font-size: 1.2rem;
  color: var(--lightBlack);
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}

#formLogin .other-account {
  color: var(--gray);
}

#formLogin .icons {
  width: 30px;
  cursor: pointer;
}

#formLogin .input {
  border-radius: 10px;
}

#formLogin .remember {
  color: var(--lightBlack);
}

#formLogin .blob {
  position: absolute;
  top: -15%;
  left: -12%;
  width: 150px;
  opacity: 0.2;
}

.forgotPassword {
  color: var(--gray);
  text-decoration: none;
}

.forgotPassword:hover {
  color: var(--primary);
  transition: 0.5s ease-in-out;
}

.arrow-btn {
  width: 100px;
  border-radius: 15px;
  background: var(--primary);
  color: #fff;
  font-size: 60px;
  padding: 5px;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25);
}

.arrow-btn:hover {
  background: var(--secondary);
  transition: 0.5s ease-in-out;
  box-shadow: none;
}

.register span {
  color: var(--lightBlack);
}

.register .loginAccount {
  color: var(--primary);
  text-decoration: none;
  cursor: pointer;
}
</style>
