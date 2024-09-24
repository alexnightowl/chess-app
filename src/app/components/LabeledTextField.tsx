import { forwardRef, PropsWithoutRef } from "react";
import { useField, useFormikContext, ErrorMessage } from "formik";
import s from "./Form.module.css";

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number";
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const [input] = useField(name);
    const { isSubmitting } = useFormikContext();

    return (
      <div {...outerProps} className={s.container}>
        <label className={s.label}>
          {label}
          <input {...input} disabled={isSubmitting} {...props} ref={ref} className={s.input} />
        </label>

        <ErrorMessage name={name} component="div" className={s.error} />
      </div>
    );
  }
);

LabeledTextField.displayName = "LabeledTextField";

export default LabeledTextField;
