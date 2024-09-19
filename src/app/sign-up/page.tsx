"use client"
import { Routes } from "@/lib/const";
import Button from "@/src/components/Buttons/Button";
import LinkButton from "@/src/components/Buttons/LinkButton";
import Form from "@/src/components/Form/Form";
import Input from "@/src/components/Form/Input";
import { ButtonTypes } from "@/types";
import { Validators } from "@/util";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function SignUp() {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<object | any>({});

  function HandleSubmit(
    _e: Event | any,
    isValid: boolean,
    data: object | any
  ) {}

  return (
    <div className="d-flex items-center justify-center signup-page">
      <div className="card">
        <h4>Sign Up</h4>

        <Form
          ref={formRef}
          HandleSubmit={HandleSubmit}
          inputNames={["first_name", "last_name", "username", "password", "email"]}
          className="w-full"
        >
          <Input
            type="text"
            name="first_name"
            className="w-full"
            legend="First Name"
            placeHolder="John"
            validators={Validators.AtleastChars("First Name")}
            required={true}
          />
          <Input
            type="text"
            name="last_name"
            className="w-full"
            legend="Last Name"
            placeHolder="Doe"
            validators={Validators.AtleastChars("Last Name")}
            required={true}
          />
          <Input
            type="text"
            name="username"
            className="w-full"
            legend="User Name"
            placeHolder="jogndoe"
            validators={Validators.userName()}
            required={true}
          />
          <Input
            type="password"
            name="password"
            className="w-full"
            legend="Password"
            placeHolder="Password"
            validators={Validators.AtleastChars("Password", 8)}
            required={true}
          />
          <Input
            type="email"
            name="email"
            className="w-full"
            legend="Email"
            placeHolder="email@example.com"
            validators={Validators.email()}
            required={true}
          />
          <div className="w-full d-flex justify-center flex-column">
            <Button className="w-full d-flex justify-center" types={[ButtonTypes.primary, ButtonTypes.round]}>
              Continue
            </Button>
            <LinkButton className="w-full d-flex justify-center m-0 p-1" onClick={()=>router.push(Routes.LoginPage)}>
              Already have an account, Go to Login
            </LinkButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
