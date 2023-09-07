<template>
  <section>
    <!-- NOTE: Personal Information -->
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
    <!-- NOTE: Plans-->
    <div v-if="step === 2">
      <h2>Select Your Plan</h2>
      <!-- Plans -->
      <RadioGroup
        v-model="form.plan"
        label="Select Plan"
        :options="[
          {
            value: 'arcade',
            label: form.billingYearly ? 'Arcade 90/yr' : 'Arcade 9/mo',
          },
          {
            value: 'advanced',
            label: form.billingYearly ? 'Arcade 120/yr' : 'Arcade 12/mo',
          },
          {
            value: 'pro',
            label: form.billingYearly ? 'Arcade 150/yr' : 'Arcade 15/mo',
          },
        ]"
      />
      <!-- Toggle Switch for Billing Period -->
      <div>
        <CheckboxInput
          v-model="form.billingYearly"
          :label="form.billingYearly ? 'Yearly' : 'Monthly'"
        />
      </div>

      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <!-- NOTE: Add-ons-->
    <div v-if="step === 3">
      <h2>Pick Add-ons</h2>

      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <!-- NOTE: Summary -->
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
import TextInput from "@/components/form/TextInput.vue";
import CheckboxInput from "@/components/form/CheckboxInput.vue";
import RadioGroup from "@/components/form/RadioGroup.vue";

export default {
  components: {
    TextInput,
    RadioGroup,
    CheckboxInput,
  },
  data() {
    return {
      step: 1,
      form: {
        name: "",
        email: "",
        phone_number: "",
        plan: "",
        billingYearly: false,
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
