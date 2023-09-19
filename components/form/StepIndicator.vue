<template>
  <div
    class="step-bg bg-cover bg-center lg:bg-bottom pt-10 pb-24 lg:p-0 lg:pt-6 lg:pl-6"
  >
    <div
      class="flex flex-row lg:flex-col justify-around max-w-xs lg:max-w-none mx-auto lg:mx-0 lg:space-y-6"
    >
      <ul v-for="(step, index) in steps" :key="index">
        <li
          class="w-8 h-8 border border-lightBlue rounded-full flex items-center justify-center text-sm"
          :class="
            activeStep === step
              ? 'bg-lightBlue text-black'
              : 'bg-transparent text-lightBlue'
          "
        >
          {{ step }}
        </li>
      </ul>
    </div>
    <span class="hidden lg:inline">Step {{ stepInWords }}</span>

    <div class="hidden lg:inline">
      {{ stepName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      steps: [1, 2, 3, 4],
      stepInWords: ["One", "Two", "Three", "Four"],
      stepNames: ["Your Info", "Select Plan", "Add-ons", "Summary"],
    };
  },
  computed: {
    // stepInWords() {
    //   const words = ["One", "Two", "Three", "Four"];
    //   return words;
    // },
    // stepNames() {
    //   const names = ["Your Info", "Select Plan", "Add-ons", "Summary"];
    //   return names[this.step];
    // },
  },
};
</script>
<style scoped>
/* backgtound image mobile*/
@media only screen and (max-width: 1024px) {
  .step-bg {
    background-image: url("@/assets/img/bg-sidebar-mobile.png");
  }
}

/* background image desktop */
@media only screen and (min-width: 1024px) {
  .step-bg {
    background-image: url("@/assets/img/bg-sidebar-desktop.png");
  }
}
</style>
