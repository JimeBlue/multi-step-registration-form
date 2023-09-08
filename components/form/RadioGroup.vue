<template>
  <ValidationProvider :rules="rules" :name="name" v-slot="{ errors }">
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
      <span v-if="errors[0]">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
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
    rules: {
      type: String,
      default: "",
    },
    name: {
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
    value(newVal) {
      this.internalValue = newVal;
    },
    internalValue(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>
