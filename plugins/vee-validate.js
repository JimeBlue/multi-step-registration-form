import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";

// If you want to use custom validation messages or use a different locale, you can import them here.
// For example:
// import en from 'vee-validate/dist/locale/en';

Vue.use(VeeValidate, {
  inject: true,
});

// If you imported a locale:
// Validator.localize('en', en);
