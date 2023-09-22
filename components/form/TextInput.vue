<template>
  <div>
    <ValidationProvider :rules="rules" :name="name" v-slot="{ errors }">
      <div class="flex flex-col space-y-1.5">
        <label :for="id" class="form-label">{{ label }}</label>
        <input
          type="text"
          class="form-input"
          :placeholder="placeholder"
          v-model="inputValue"
        />
        <span v-if="errors[0]">{{ errors[0] }}</span>
      </div>
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
    id: {
      type: String,
      default: "",
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    label: {
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
    name: {
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
