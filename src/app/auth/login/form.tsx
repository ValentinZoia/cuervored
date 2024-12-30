"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { LogoButton } from "@/components/ui/button-logo";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "./action";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import { CaslaButton } from "@/components/ui/CaslaButton";

export default function LoginForm() {
  const [state, action] = useFormState(login, {
    message: "",
    errors: null,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.message,
        variant: "success", 
      });

      formRef.current?.reset(); //clean form
      router.push("/dashboard");
    }
  }, [state?.message]);

  return (
    <form
      ref={formRef}
      action={action}
      className="w-full    flex flex-col gap-4 py-8 md:px-0"
    >
      {state?.message && (
        <p className="text-sm bg-green-500 text-white rounded-md px-4 py-2">
          {state?.message}
        </p>
      )}
      {state?.errors?.general && (
        <p className="text-sm bg-red-500 text-white rounded-md px-4 py-2">
          {state?.errors?.general}
        </p>
      )}

      {/* Email*/}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>
      {state?.errors?.email && (
        <small className="text-sm text-red-500">{state.errors.email[0]}</small>
      )}

      {/* Password*/}
      <div>
        <Label htmlFor="password">Password</Label>
        <InputPassword type="password" id="password" name="password" />
      </div>
      {state?.errors?.password && (
        <div className="text-sm text-red-500">
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit button */}
      <SubmitButton />

      {/* --- or --- */}
      <div className="flex justify-center items-center gap-2">
        <hr className="w-1/2 " />
        <span className="text-sm text-gray-400">OR</span>
        <hr className="w-1/2" />
      </div>

      {/*Github Login Button*/}
      <LogoButton
        type="button"
        variant={"outline"}
        logo={"github"}
        onClick={() => {
          signIn("github", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT[0].path,
            redirect: true,
          });
        }}
      >
        Log In with Github
      </LogoButton>

      {/*Google Login Button*/}
      <LogoButton
        type="button"
        variant={"outline"}
        logo={"google"}
        onClick={() => {
          signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT[0].path,
            redirect: true,
          });
        }}
      >
        Log In with Google
      </LogoButton>

      <p className="text-sm text-center text-gray-400">
        Don't have an account?{" "}
        <Link href={"/auth/register"} className="text-blue-500 font-bold">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <CaslaButton aria-disabled={pending} type="submit" variant="redToBlue" className="justify-center ">
      {pending ? "Submitting..." : "Log In"}
    </CaslaButton>
    
  );
}
