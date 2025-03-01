<template>
  <b-container id="mainContainer" align-v="center">
    <BlobBg />
    <b-row align-v="center" align-h="center">
      <b-col md="6">
        <FormRecover />
      </b-col>
      <b-col md="6">
        <img
          src="../assets/images/business-coffee.png"
          fluid
          class="businessImg scale-in-bottom"
          center
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormRecover from "../components/FormRecover.vue";
import BlobBg from "../components/BlobBg.vue";

export default {
  components: {
    FormRecover,
    BlobBg,
  },
};
</script>

<style>
#mainContainer {
  width: 100%;
  height: auto;
  position: relative;
}
</style>
