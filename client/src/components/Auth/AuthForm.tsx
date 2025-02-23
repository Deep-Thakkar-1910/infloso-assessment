import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import {
  signInSchema,
  signUpSchema,
  type SignInValues,
  type SignUpValues,
} from "@/lib/auth-schema";
import { Checkbox } from "../ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/axios/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export function AuthForm() {
  // states for form tab and password fields
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [showSignInPassword, setShowSignInPassword] = useState<boolean>(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "all",
  });

  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  // submit handler for signin form
  const onSignInSubmit = async (data: SignInValues) => {
    try {
      // api call to login endpoint
      const response = await axios.post("/auth/login", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        // navigate to dashboard page if successful
        navigate("/dashboard");
        setIsAuthenticated(true);
        toast.success(`You are Signed in as ${data.email}`);
      }
    } catch (err) {
      // else show toast with error message
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.error);
        signInForm.reset();
      }
    }
  };

  const onSignUpSubmit = async (data: SignUpValues) => {
    try {
      const response = await axios.post("/auth/signup", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        signInForm.setValue("email", data.email);
        setActiveTab("signin");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.error);
        signUpForm.reset();
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between"></div>
        <CardDescription className="place-self-center text-lg">
          {activeTab === "signin" ? "Welcome back to" : "Create"} your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Sign In Tab */}
              <TabsContent value="signin" className="mt-4">
                <Form {...signInForm}>
                  <form
                    onSubmit={signInForm.handleSubmit(onSignInSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type={showSignInPassword ? "text" : "password"}
                            />
                          </FormControl>
                          {showSignInPassword ? (
                            <EyeClosedIcon
                              onClick={() => setShowSignInPassword(false)}
                              className="absolute right-1 top-8 cursor-pointer"
                            />
                          ) : (
                            <EyeIcon
                              onClick={() => setShowSignInPassword(true)}
                              className="absolute right-1 top-8 cursor-pointer"
                            />
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <p>Remember Me?</p>
                        </FormItem>
                      )}
                    />
                    <Button
                      asChild
                      className="w-full bg-zinc-800 text-sky-500 dark:text-sky-400 dark:bg-grey-100 cursor-pointer hover:dark:bg-grey-100 hover:bg-zinc-800"
                    >
                      <Link to={"/resetPassword"}>Reset Password</Link>
                    </Button>
                    <Button type="submit" className="w-full mt-2">
                      Login
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="mt-4">
                <Form {...signUpForm}>
                  <form
                    onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type={showSignUpPassword ? "text" : "password"}
                            />
                          </FormControl>
                          {showSignUpPassword ? (
                            <EyeClosedIcon
                              onClick={() => setShowSignUpPassword(false)}
                              className="absolute right-1 top-8 cursor-pointer"
                            />
                          ) : (
                            <EyeIcon
                              onClick={() => setShowSignUpPassword(true)}
                              className="absolute right-1 top-8 cursor-pointer"
                            />
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      {signUpForm.formState.isSubmitting
                        ? "Creating"
                        : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  );
}
