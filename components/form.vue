<template>
  <section>
    <!-- NOTE: Step indicator -->
    <StepIndicator :step="step" />
    <ValidationObserver ref="observer">
      <!-- NOTE: Personal Information -->
      <div v-if="step === 1">
        <h2>Personal Information</h2>
        <FormTextInput
          v-model="form.name"
          placeholder="Name"
          rules="required"
        />
        <FormTextInput
          v-model="form.email"
          placeholder="Email"
          rules="required|email"
        />
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
          rules="required"
          :options="[
            {
              value: 'arcade',
              label: form.billingYearly ? 'Arcade 90/yr' : 'Arcade 9/mo',
            },
            {
              value: 'advanced',
              label: form.billingYearly ? 'Advanced 120/yr' : 'Advanced 12/mo',
            },
            {
              value: 'pro',
              label: form.billingYearly ? 'Pro 150/yr' : 'Pro 15/mo',
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
        <CheckboxInput v-model="form.onlineService" label="Online Service" />
        <CheckboxInput
          v-model="form.largerStorage"
          :label="
            form.billingYearly ? 'Larger Storage 20/yr' : 'Larger Storage 2/mo'
          "
        />
        <CheckboxInput
          v-model="form.customizableProfile"
          :label="
            form.billingYearly
              ? 'Customizable Profile 20/yr'
              : 'Customizable Profile 2/mo'
          "
        />
        <button @click="prevStep">Previous</button>
        <button @click="nextStep">Next</button>
      </div>
      <!-- NOTE: Summary -->
      <div v-if="step === 4">
        <h2>Summary</h2>
        <p>Finishing up</p>
        <p>Double-check everything looks OK before confirming.</p>
        <!-- Display Chosen Plan with Billing Period and Price -->
        <div>
          <p>
            {{ chosenPlan }} ({{ form.billingYearly ? "Yearly" : "Monthly" }}) -
            ${{ form.billingYearly ? yearlyPlanPrice : monthlyPlanPrice }}
            <button @click="goToStep(2)">Change</button>
          </p>
        </div>
        <!-- Display Chosen Add-ons -->
        <div v-if="form.onlineService">
          Online Service - ${{ form.billingYearly ? "10/yr" : "1/mo" }}
        </div>
        <div v-if="form.largerStorage">
          Larger Storage - ${{ form.billingYearly ? "20/yr" : "2/mo" }}
        </div>
        <div v-if="form.customizableProfile">
          Customizable Profile - ${{ form.billingYearly ? "20/yr" : "2/mo" }}
        </div>
        <!-- Display Total Amount -->
        <p>Total: ${{ totalAmount }}</p>
        <button @click="prevStep">Previous</button>
        <button @click="submitForm">Submit</button>
      </div>
    </ValidationObserver>
  </section>
</template>
<script>
import { db } from "~/plugins/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ValidationObserver } from "vee-validate";
import TextInput from "@/components/form/TextInput.vue";
import CheckboxInput from "@/components/form/CheckboxInput.vue";
import RadioGroup from "@/components/form/RadioGroup.vue";
import StepIndicator from "@/components/form/StepIndicator.vue";

export default {
  components: {
    ValidationObserver,
    TextInput,
    RadioGroup,
    CheckboxInput,
    StepIndicator,
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
        onlineService: false,
        largerStorage: false,
        customizableProfile: false,
      },
    };
  },
  computed: {
    //  converts the first letter of the form.plan value to uppercase to display the plan name in a user-friendly format.
    chosenPlan() {
      return this.form.plan.charAt(0).toUpperCase() + this.form.plan.slice(1);
    },
    //  Use a switch statement to determine the plan price based on the value of form.plan.
    monthlyPlanPrice() {
      switch (this.form.plan) {
        case "arcade":
          return 9;
        case "advanced":
          return 12;
        case "pro":
          return 15;
        default:
          return 0;
      }
    },
    yearlyPlanPrice() {
      switch (this.form.plan) {
        case "arcade":
          return 90;
        case "advanced":
          return 120;
        case "pro":
          return 150;
        default:
          return 0;
      }
    },
    totalAmount() {
      let total = this.form.billingYearly
        ? this.yearlyPlanPrice
        : this.monthlyPlanPrice;

      if (this.form.onlineService) total += this.form.billingYearly ? 10 : 1;
      if (this.form.largerStorage) total += this.form.billingYearly ? 20 : 2;
      if (this.form.customizableProfile)
        total += this.form.billingYearly ? 20 : 2;

      return total;
    },
  },
  methods: {
    async nextStep() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.step++;
      }
    },

    prevStep() {
      this.$refs.observer.reset();
      this.step--;
    },
    goToStep(stepNumber) {
      this.$refs.observer.reset();
      this.step = stepNumber;
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
