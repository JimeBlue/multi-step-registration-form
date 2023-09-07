<template>
  <div>
    <input type="checkbox" :checked="value" @change="updateValue" />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.checked);
    },
  },
};
</script>
