<template>
  <div>
    <input
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      v-validate="validation"
      :name="name"
    />
    <span v-if="validationErrors && validationErrors.has(name)">{{
      validationErrors.first(name)
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    validation: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    validationErrors() {
      return this.$_veeValidate ? this.$_veeValidate.errors : null;
    },
  },

  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
