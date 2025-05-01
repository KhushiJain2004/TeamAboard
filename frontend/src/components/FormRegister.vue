<template>
  <div>
    <b-card id="cardLogin" class="scale-in-bl">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="formLogin">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="blob">
          <path fill="#41B883"
            d="M66.2,-49.1C81.5,-33.5,86.8,-6.2,79.8,15.6C72.7,37.5,53.3,53.9,30.9,65.1C8.5,76.2,-16.9,81.9,-36.2,73.3C-55.5,64.7,-68.8,41.7,-70.8,19.9C-72.8,-2,-63.6,-22.7,-49.9,-37.8C-36.2,-53,-18.1,-62.7,3.6,-65.6C25.4,-68.5,50.8,-64.6,66.2,-49.1Z"
            transform="translate(100 100)" />
        </svg>

        <h1 class="text-center mb-3">Sign Up</h1>
        <h2 class="text-center mb-4">Register with:</h2>

        <div class="d-flex justify-content-center mb-4">
          <img src="../assets/images/google.png" alt="Google" class="icons" />
          <img src="../assets/images/github.png" alt="GitHub" class="icons mx-4" />
        </div>

        <p class="text-center mb-4 other-account">Or create your own account</p>

        <b-form-group label-for="name">
          <b-form-input id="name" class="input" v-model="form.name" type="text" placeholder="Name"
            required></b-form-input>
        </b-form-group>

        <b-form-group label-for="email">
          <b-form-input id="email" class="input" v-model="form.email" type="email" placeholder="Email"
            required></b-form-input>
        </b-form-group>

        <b-form-group label-for="role">
          <b-form-select id="role" class="input" v-model="form.role" :options="roleOptions" required
            placeholder="Register as"></b-form-select>
        </b-form-group>

        <b-form-group label-for="password">
          <b-form-input id="password" class="input" v-model="form.password" type="password" placeholder="Password"
            required></b-form-input>
        </b-form-group>

        <div class="d-flex justify-content-start flex-wrap">
          <b-form-checkbox v-model="form.agreeToTerms" class="remember" :value="true">
            I have read and agree to the terms of use
          </b-form-checkbox>
        </div>

        <div class="d-flex justify-content-center mt-3">
          <b-button variant="primary" type="submit" class="arrow-btn">
            <font-awesome-icon icon="arrow-right" />
          </b-button>
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
        password: "",
        role: null,
        agreeToTerms: false,
      },
      show: true,
      roleOptions: ["Mentor", "Student"],
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (!this.form.agreeToTerms) {
        alert("Please agree to the terms of use.");
        return;
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form = {
        email: "",
        name: "",
        password: "",
        role: null,
        agreeToTerms: false,
      };
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
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
  width: 100px;
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

.arrow-btn {
  width: 100px;
  border-radius: 15px;
  background: var(--primary);
  color: #fff;
  font-size: 24px;
    padding: 12px;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25);
}

.arrow-btn:hover {
  background: var(--secondary);
  transition: 0.3s ease-in-out;
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
