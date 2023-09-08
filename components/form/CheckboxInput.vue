<template>
  <ValidationProvider :rules="rules" v-slot="{ errors }">
    <div>
      <input type="checkbox" v-model="inputValue" />
      <label>{{ label }}</label>
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
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    rules: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
    inputValue(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>
