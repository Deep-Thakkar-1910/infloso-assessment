import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  signUpSchema as resetPasswordSchema,
  type SignUpValues as ResetPasswordValues,
} from "@/lib/auth-schema";
import { useNavigate } from "react-router-dom";
import axios from "@/axios/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    try {
      const response = await axios.post(
        "/auth/reset-password",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        navigate("/");
        toast.success("Password reset successful");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.error);
        form.reset();
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription className="text-lg text-center">
            Reset Your Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
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
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    {showPassword ? (
                      <EyeClosedIcon
                        onClick={() => setShowPassword(false)}
                        className="absolute right-1 top-8 cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowPassword(true)}
                        className="absolute right-1 top-8 cursor-pointer"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    {showConfirmPassword ? (
                      <EyeClosedIcon
                        onClick={() => setShowConfirmPassword(false)}
                        className="absolute right-1 top-8 cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowConfirmPassword(true)}
                        className="absolute right-1 top-8 cursor-pointer"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
