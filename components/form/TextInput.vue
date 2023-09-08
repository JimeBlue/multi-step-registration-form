<template>
  <div>
    <ValidationProvider :rules="rules" v-slot="{ errors }">
      <input type="text" :placeholder="placeholder" v-model="inputValue" />
      <span v-if="errors[0]">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
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
