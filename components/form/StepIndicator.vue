<template>
  <div>
    <div>
      <span>{{ step }}</span>
      <span>Step {{ stepInWords }}</span>
    </div>
    <div>
      {{ stepName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
  computed: {
    stepInWords() {
      const words = ["One", "Two", "Three", "Four"];
      return words[this.step - 1];
    },
    stepName() {
      const names = ["Your Info", "Select Plan", "Add-ons", "Summary"];
      return names[this.step - 1];
    },
  },
};
</script>
