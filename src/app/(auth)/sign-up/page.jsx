"use client";

import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const SignUpSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(
    [
      "branch_manager",
      "postmaster",
      "subdivisional_manager",
      "divisional_manager",
      "employee",
    ],
    "Please select a role"
  ),
  governmentIdType: z.enum(
    ["aadhar", "pan", "voter_id", "driving_license", "passport"],
    "Please select a government Id"
  ),
  governmentId: z.string().min(6, "Government Id is required"),
  mobileNo: z.string().min(10, "Mobile number is required"),
});

function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/users/register`,
        {
          name: data.firstName + " " + data.lastName,
          email: data.email,
          password: data.password,
          role: data.role,
          governmentIdType: data.governmentIdType,
          governmentId: data.governmentId,
          mobileNo: data.mobileNo,
        },
        {
          withCredentials: true,
        }
      );
      router.push("/login");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: error.response?.data?.message || "Sign up failed",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12 lg:py-0">
        <div className="mx-auto grid mt-10 md:mt-16 w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  {...form.register("firstName")}
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  {...form.register("lastName")}
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobileNo">Phone</Label>
              <Input
                id="mobileNo"
                type="number"
                {...form.register("mobileNo")}
              />
              {form.formState.errors.mobileNo && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.mobileNo.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="governmentIdType">Government Id type</Label>
              <Select
                onValueChange={(value) =>
                  form.setValue("governmentIdType", value)
                }
                defaultValue={form.getValues("governmentIdType")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select id type here" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aadhar">Aadhar Card</SelectItem>
                  <SelectItem value="pan">PAN Card</SelectItem>
                  <SelectItem value="voter_id">Voter ID</SelectItem>
                  <SelectItem value="driving_license">
                    Driving License
                  </SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.governmentIdType && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.governmentIdType.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="governmentId">Government Id</Label>
              <Input
                id="governmentId"
                placeholder="XXXXXXXXXXXXXXXX"
                type="text"
                {...form.register("governmentId")}
              />
              {form.formState.errors.governmentId && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.governmentId.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                onValueChange={(value) => form.setValue("role", value)}
                defaultValue={form.getValues("role")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="branch_manager">branch manager</SelectItem>
                  <SelectItem value="postmaster">postmaster</SelectItem>
                  <SelectItem value="subdivisional_manager">
                    subdivisional manager
                  </SelectItem>
                  <SelectItem value="divisional_manager">
                    divisional manager
                  </SelectItem>
                  <SelectItem value="employee">employee</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.role && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.role.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading || !form.formState.isValid}
              className="w-full"
            >
              {loading && <Loader2 className="animate-spin" />}
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/assets/po-collage-m.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Page;
