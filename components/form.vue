<template>
  <section>
    <div v-if="step === 1">
      <h2>Personal Information</h2>
      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.email" placeholder="Email" />
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 2">
      <h2>Select Your Plan</h2>

      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 3">
      <h2>Pick Add-ons</h2>

      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 4">
      <h2>Summary</h2>

      <button @click="prevStep">Previous</button>
      <button @click="submitForm">Submit</button>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      step: 1,
      form: {
        name: "",
        email: "",
        // Add other form fields here
      },
    };
  },
  methods: {
    nextStep() {
      // Add validation logic here using VeeValidate
      this.step++;
    },
    prevStep() {
      this.step--;
    },
    submitForm() {
      // Submit the form data to Firebase
    },
  },
};
</script>
