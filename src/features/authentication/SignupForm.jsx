import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { useSignup } from "./useSignup";

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Full name"
        orientation="vertical"
        error={errors?.fullName?.message}
      >
        <Input
          type="fullName"
          id="fullName"
          {...register("fullName", { required: "This field is required." })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow
        label="Email address"
        orientation="vertical"
        error={errors?.email?.message}
      >
        <Input
          type="email"
          id="email"
          {...register("email", { required: "This field is required." })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow
        label="Password"
        orientation="vertical"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", { required: "This field is required." })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow
        label="Confirmed password"
        orientation="vertical"
        error={errors?.confirmedPassword?.message}
      >
        <Input
          type="password"
          id="confirmedPassword"
          {...register("confirmedPassword", {
            required: "This field is required.",
            validate: (value) =>
              getValues("password") === value ||
              "Confiremd password must be the same as the password",
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isPending}>
          Sign up
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
