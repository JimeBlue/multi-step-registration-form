<template>
  <div class="relative w-full">
    <!-- Use an img tag as the background image -->
    <img
      :src="require('@/assets/img/bg-sidebar-mobile.png')"
      alt=""
      class="w-full"
    />
    <!-- Add text on top of the image using absolute positioning -->
    <div class="absolute inset-0 z-10">
      <div class="flex flex-row justify-around mt-10 max-w-xs mx-auto">
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
    </div>
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
    };
  },
  computed: {
    stepInWords() {
      const words = ["One", "Two", "Three", "Four"];
      return words[this.step - 1];
    },
    stepNames() {
      const names = ["Your Info", "Select Plan", "Add-ons", "Summary"];
      return names[this.step - 1];
    },
  },
};
</script>
