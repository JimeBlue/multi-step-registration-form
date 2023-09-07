<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div v-for="option in options" :key="option.value">
      <input
        type="radio"
        :id="option.value"
        :value="option.value"
        v-model="internalValue"
      />
      <label :for="option.value">{{ option.label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      internalValue: this.value,
    };
  },
  watch: {
    internalValue(newVal) {
      this.$emit("input", newVal);
    },
    value(newVal) {
      this.internalValue = newVal;
    },
  },
};
</script>
