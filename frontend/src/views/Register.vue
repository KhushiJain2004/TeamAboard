<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <b-container id="mainContainer" align-v="center">
    <BlobBg />
    <b-row align-v="center" align-h="center">
      <b-col md="6">
        <FormRegister />
      </b-col>
      <b-col md="6">
        <img
          src="../assets/images/business-like.png"
          fluid
          class="businessImg scale-in-bottom"
          center
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormRegister from "../components/FormRegister.vue";
import BlobBg from "../components/BlobBg.vue";

export default {
  components: {
    FormRegister,
    BlobBg,
  },
};
</script>

<style>
#mainContainer {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  min-height: 100%;
}
</style>
