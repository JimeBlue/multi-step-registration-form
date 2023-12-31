<template>
  <section
    class="grid lg:grid-cols-5 bg-magnolia lg:bg-white lg:rounded-lg pb-24 lg:p-6 font-sans"
  >
    <!-- NOTE: Step indicator -->
    <article class="lg:col-span-1">
      <StepIndicator :active-step="step" />
    </article>
    <!-- NOTE: Form -->
    <article
      class="lg:col-span-4 shadow-sm lg:shadow-none rounded-lg bg-white -mt-16 lg:mt-0 xl:w-9/12 xl:mx-auto"
    >
      <ValidationObserver ref="observer">
        <form @submit.prevent>
          <section v-if="!isSubmitted">
            <!-- NOTE: Personal Information -->
            <div v-if="step === 1" class="p-6">
              <hgroup class="space-y-2">
                <h2 class="step-heading">Personal Information</h2>
                <p class="text-primary lg:text-lg">
                  Please provide your name, email address, and phone number.
                </p>
              </hgroup>
              <div class="mt-6 space-y-4">
                <FormTextInput
                  id="name"
                  v-model="form.name"
                  name="Your name"
                  label="Name"
                  placeholder="e.g.Stephen King"
                  rules="required"
                />
                <FormTextInput
                  id="email"
                  v-model="form.email"
                  name="Your email"
                  label="Email Address"
                  placeholder="e.g. stephenking@gmail.com"
                  rules="required|email"
                />
                <FormTextInput
                  id="phone"
                  v-model="form.phone_number"
                  label="Phone Number"
                  placeholder="e.g. +1 234 567 890"
                />
              </div>
              <button
                type="button"
                @click="nextStep"
                class="btn btn-primary mt-6"
              >
                Next
              </button>
            </div>
            <!-- NOTE: Plans-->
            <div v-if="step === 2" class="p-6">
              <hgroup class="space-y-2">
                <h2 class="step-heading">Select Your Plan</h2>
                <p class="text-primary lg:text-lg">
                  You have the option of monthly or yearly billing.
                </p>
              </hgroup>

              <div class="mt-6 space-y-4">
                <!-- Plans -->
                <div>
                  <RadioGroup
                    v-model="form.plan"
                    name="Slecting a plan"
                    rules="required"
                    :options="[
                      {
                        value: 'arcade',
                        label: 'Arcade',
                        text: form.billingYearly ? ' 90/yr' : ' 9/mo',
                      },
                      {
                        value: 'advanced',
                        label: 'Advanced',
                        text: form.billingYearly ? '120/yr' : '12/mo',
                      },
                      {
                        value: 'pro',
                        label: 'Pro',
                        text: form.billingYearly ? '150/yr' : '15/mo',
                      },
                    ]"
                  />
                </div>
                <!-- Toggle Switch for Billing Period -->
                <div>
                  <CheckboxInput
                    v-model="form.billingYearly"
                    :label="form.billingYearly ? 'Yearly' : 'Monthly'"
                  />
                </div>
              </div>
              <div class="mt-6">
                <button type="button" @click="prevStep">Previous</button>
                <button type="button" @click="nextStep">Next</button>
              </div>
            </div>
            <!-- NOTE: Add-ons-->
            <div v-if="step === 3" class="p-6">
              <h2 class="step-heading">Pick Add-ons</h2>
              <CheckboxInput
                v-model="form.onlineService"
                :label="
                  form.billingYearly
                    ? 'Online Service 10/yr'
                    : 'Online Service 1/mo'
                "
              />
              <CheckboxInput
                v-model="form.largerStorage"
                :label="
                  form.billingYearly
                    ? 'Larger Storage 20/yr'
                    : 'Larger Storage 2/mo'
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
              <button type="button" @click="prevStep">Previous</button>
              <button type="button" @click="nextStep">Next</button>
            </div>
            <!-- NOTE: Summary -->
            <div v-if="step === 4" class="p-6">
              <h2 class="step-heading">Summary</h2>
              <p>Finishing up</p>
              <p>Double-check everything looks OK before confirming.</p>
              <!-- Display Chosen Plan with Billing Period and Price -->
              <div>
                <p>
                  {{ chosenPlan }} ({{
                    form.billingYearly ? "Yearly" : "Monthly"
                  }}) - ${{
                    form.billingYearly ? yearlyPlanPrice : monthlyPlanPrice
                  }}
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
                Customizable Profile - ${{
                  form.billingYearly ? "20/yr" : "2/mo"
                }}
              </div>
              <!-- Display Total Amount -->
              <p>Total: ${{ totalAmount }}</p>
              <button type="button" @click="prevStep">Previous</button>
              <button type="button" @click="submitForm">Submit</button>
            </div>
          </section>
          <!-- NOTE: Confirmation Message -->
          <section v-if="isSubmitted">
            <h2>Thank You!</h2>
            <p>
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at
              <a href="mailto:support@loremgaming.com"
                >support@loremgaming.com</a
              >.
            </p>
          </section>
        </form>
      </ValidationObserver>
    </article>
    <!-- NOTE: FormDebug component allowing to navigate to specific step -->
    <FormDebug :debug="debug" :currentStep="step" @changeStep="setStep" />
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
import FormDebug from "@/components/form/FormDebug.vue";
import "@/assets/css/buttons.css";
import "@/assets/css/forms.css";
import "@/assets/css/steps.css";
import "@/assets/css/fonts.css";

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
      debug: false,
      isSubmitted: false,
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
  mounted() {
    if (this.$route.query.debug === "true") {
      this.debug = true;
    }
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
    setStep(stepNumber) {
      this.step = stepNumber;
    },

    async submitForm() {
      try {
        // Intentionally throw an error for testing
        // throw new Error("Intentional submission error for testing!");

        const docRef = await addDoc(collection(db, "forms"), this.form);
        this.isSubmitted = true;
      } catch (error) {
        console.error("Error submitting form:", error);
        this.$swal("Error", "There was an error submitting the form.", "error");
      }
    },
  },
};
</script>
