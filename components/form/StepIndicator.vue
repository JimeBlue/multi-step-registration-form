<template>
  <div
    class="step-bg bg-cover bg-center lg:bg-bottom pt-10 pb-24 lg:p-0 lg:pt-6 lg:pl-6"
  >
    <div
      class="flex flex-row lg:flex-col justify-around max-w-xs lg:max-w-none mx-auto lg:mx-0 lg:space-y-6"
    >
      <ul v-for="(step, index) in steps" :key="index">
        <li class="lg:flex lg:space-x-3">
          <p
            class="w-8 h-8 border rounded-full flex items-center justify-center text-sm"
            :class="
              activeStep === step
                ? 'bg-lightBlue border-lightBlue text-black'
                : 'bg-transparent border-white text-white'
            "
          >
            {{ step }}
          </p>
          <article class="hidden lg:block">
            <p class="text-white/75 text-sm">STEP {{ step }}</p>
            <p class="uppercase text-white">{{ stepNames[index] }}</p>
          </article>
        </li>
      </ul>
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
      // IMPORTANT: si no la uso mas borrarla
      steps: [1, 2, 3, 4],

      stepNames: ["Your Info", "Select Plan", "Add-ons", "Summary"],
    };
  },
  // IMPORTANT: idea: poner la array con el numbero del step y la array con el nombre del step in the en una computed property y loopearla desde la computed
  // property en el template
  computed: {},
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
