<template>
  <section>
    <div v-if="step === 1">
      <h2>Personal Information</h2>
      <FormTextInput v-model="form.name" placeholder="Name" />
      <FormTextInput v-model="form.email" placeholder="Email" />
      <FormTextInput
        v-model="form.phone_number"
        placeholder="e.g. +1 234 567 890"
      />
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
import { db } from "~/plugins/firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      step: 1,
      form: {
        name: "",
        email: "",
        phone_number: "",
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
    async submitForm() {
      try {
        const docRef = await addDoc(collection(db, "forms"), this.form);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form.");
      }
    },
  },
};
</script>
