import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";



const SigninForm = () => {

  const isLoading = false;

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 

  return (
      <Form {...form}>
        <Link to="/">
          <Button
            className="fixed top-12 left-5 opacity-100 shadow-md bg-neutral-600"
            size="icon"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.png" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log In to your account</h2>
          <p className="text-light-3 small-medium md:base-regular">To use PayFly, enter you details</p>
        
        <form onSubmit={() => {}} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary mt-4">
            <Link to='/home'>
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader />
                  Loading...
                </div>
              ) : "Sign In"}
            </Link>
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to='/signup' className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
        </div>
      </Form>
  )
}

export default SigninForm
