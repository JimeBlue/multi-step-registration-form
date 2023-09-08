import { extend, configure } from "vee-validate";
import { email, required, regex, confirmed } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("regex", regex);
extend("confirmed", confirmed);
extend("checkbox_required", {
  validate: (value) => value === true,
  message: "{_field_} is required.",
});

export default function VeeValidatePlugin({ app }) {
  configure({
    defaultMessage: (field, values) => {
      values._field_ = field;
      switch (values._rule_) {
        case "required":
          return `${field} is required.`;
        case "email":
          return `Please enter a valid email address.`;
        // ... add more custom messages for other rules
        default:
          return `${field} validation failed.`;
      }
    },
  });
}
