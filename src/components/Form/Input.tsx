import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IsArray, IsDomElement, IsEmpty, IsFunction } from "@/util";
import { useCustomEventListener } from "@/util/Hooks";
import { InputProps } from "@/types";
import Image from "next/image";

const FormInput = (props: InputProps, outerRef: ForwardedRef<any>) => {
  const ref = useRef<HTMLInputElement>(null);
  const validationTimer = useRef<number>(0);
  useImperativeHandle(outerRef, () => ref.current!, []);

  const {
    type,
    className,
    placeHolder,
    name,
    legend,
    info,
    validators,
    ignoreValidation = false,
    autoValidate = false,
    onFocus: HandleOnFocus,
    onBlur: HandleOnBlur,
    onChange: HandleOnChange,
    selectAllOnFocus = true,
    required = false,
    ...otherProps
  } = props;
  const [value, setValue] = useState<string | number | any>("");
  const [error, setError] = useState<string>("");

  useCustomEventListener("form-submit", HandleValidation);

  useEffect(() => {
    if (autoValidate) {
      clearTimeout(validationTimer.current);
      validationTimer.current = window.setTimeout(() => {
        HandleValidation();
      }, 800);
    }
  }, [autoValidate, value]);

  function ClearValue(_e: Event | any) {
    if (IsDomElement(ref.current) && ref.current instanceof HTMLInputElement)
      ref.current.value = "";
    setValue("");
    OnChange({ target: ref.current });
  }
  function OnFocus(e: Event | any) {
    if (
      selectAllOnFocus &&
      IsDomElement(ref.current) &&
      ref.current instanceof HTMLInputElement
    )
      ref.current.select();
    if (HandleOnFocus && IsFunction(HandleOnFocus)) HandleOnFocus(e);
  }
  function OnBlur(e: Event | any) {
    if (HandleOnBlur && IsFunction(HandleOnBlur)) HandleOnBlur(e);
    HandleValidation();
  }
  function OnChange(e: Event | any) {
    setValue(e.target.value);
    setError("");
    if (HandleOnChange && IsFunction(HandleOnChange)) HandleOnChange(e);
  }

  function HandleValidation() {
    if (ignoreValidation == true) return;
    if (!value && !required) {
      setError("");
      return;
    }
    if (validators && IsArray(validators) && validators.length > 0) {
      for (let i = 0; i < validators.length; i++) {
        const validator = validators[i];
        if (validator && IsFunction(validator)) {
          const validationResult = validators[i](value);
          if (typeof validationResult == "string") {
            setError(validationResult);
            return false;
          }
        }
      }
    }
    setError("");
    return true;
  }

  const isValueEmpty = IsEmpty(value);
  const isInvalid = !IsEmpty(error);
  const _class = `form-input-box ${className} ${
    isInvalid ? "form-input-invalid" : ""
  }`;

  return (
    <div className={_class}>
      <div className="form-input-label d-flex items-center">
        <span className="form-input-legend">
          {legend}
          {!required ? (
            <span className="form-input-optional-label">(Optional)</span>
          ) : (
            <></>
          )}
        </span>
      </div>
      <div className="form-input d-flex items-center">
        <input
          type={type}
          name={name}
          className="flex-grow h-full"
          placeholder={placeHolder}
          value={value}
          onFocus={OnFocus}
          onBlur={OnBlur}
          onChange={OnChange}
          ref={ref}
          {...otherProps}
        />
        <div
          className={`flex-shrink transition-all ${
            !isValueEmpty ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={ClearValue}
        >
          <Image
            src={"@/public/clear.svg"}
            alt=""
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
      <div
        className={`form-input-error transition-all ${
          isInvalid ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <span>{error}</span>
      </div>
    </div>
  );
};

export default forwardRef(FormInput);
