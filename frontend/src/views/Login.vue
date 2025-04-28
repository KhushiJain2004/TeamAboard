<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <b-container id="mainContainer" align-v="center">
    <BlobBg />
    <b-row align-v="center" align-h="center">
      <b-col md="6">
        <FormLogin />
      </b-col>
      <b-col md="6">
        <img
          src="../assets/images/business.png"
          fluid
          class="businessImg scale-in-bottom"
          center
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BlobBg from "../components/BlobBg.vue";
import FormLogin from "../components/FormLogin.vue";

export default {
  components: {
    FormLogin,
    BlobBg,
  },
};
</script>

<style>
#mainContainer {
  width: 100%;
  height: auto;
  position: absolute;
  overflow: hidden;
}
</style>
