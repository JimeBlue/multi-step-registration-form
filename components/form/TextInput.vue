<template>
  <div>
    <input
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
    />
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
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
