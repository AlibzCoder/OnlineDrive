"use client";
import { Routes } from "@/lib/const";
import Button from "@/src/components/Buttons/Button";
import LinkButton from "@/src/components/Buttons/LinkButton";
import Form from "@/src/components/Form/Form";
import Input from "@/src/components/Form/Input";
import { IsDomElement, Validators } from "@/util";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Login() {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<object | any>({});

  function HandleSubmit(
    _e: Event | any,
    isValid: boolean,
    data: object | any
  ) {}

  function Submit() {
    if (
      IsDomElement(formRef.current) &&
      formRef.current instanceof HTMLFormElement
    ) {
      formRef.current.doSubmit();
    }
  }

  return (
    <div className="d-flex items-center justify-center login-page">
      <div className="card">
        <h4>Login</h4>
        <Form
          ref={formRef}
          HandleSubmit={HandleSubmit}
          inputNames={["username", "password"]}
          className="w-full"
        >
          <Input
            type="text"
            name="username"
            className="w-full"
            legend="User Name"
            placeHolder="John"
            validators={Validators.userName()}
            required={true}
          />
          <Input
            type="password"
            name="password"
            className="w-full"
            legend="Password"
            placeHolder="Doe"
            validators={Validators.AtleastChars("Password", 8)}
            required={true}
          />
          <div className="w-full d-flex justify-center flex-column">
            <Button className="w-full d-flex justify-center" onClick={Submit}>
              Continue
            </Button>
            <LinkButton
              className="w-full d-flex justify-center m-0 p-1"
              onClick={() => {
                router.push(Routes.SignUpPage);
              }}
            >
              Already have an account, Go to Sign Up
            </LinkButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
