<template>
  <div v-if="debug">
    <h3>Debug Information</h3>
    <p><strong>Current Step:</strong> {{ currentStep }}</p>

    <div>
      <h4>Jump to Step:</h4>
      <button @click="goToStep(1)">Step 1</button>
      <button @click="goToStep(2)">Step 2</button>
      <button @click="goToStep(3)">Step 3</button>
      <button @click="goToStep(4)">Step 4</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    goToStep(stepNumber) {
      this.$emit("changeStep", stepNumber);
    },
  },
};
</script>
