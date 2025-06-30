"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  Cross,
  Loader2,
  Router,
  Send,
  X,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_PUBLIC_ACCESS_KEY;

const helpOptions = [
  "Web App Development",
  "E-commerce Development",
  "Saas Development",
  "Other",
];

const budgetOptions = ["<$5,000", "$5,000 - $10,000", "$10,000+"];

const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal(""))
    .optional(),
  email: z.string().email("Please enter a valid email address"),
  help: z.string().min(2, "Please select what you need help with"),
  budget: z.string().optional(),
  project: z.string().max(1000, "Project description is too long").optional(),
  referral: z.string().max(100, "Referral is too long").optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [result, setResult] = React.useState("");
  const [isGoingBack, setIsGoingBack] = React.useState(false);
  const router = useRouter();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      website: "",
      email: "",
      help: "",
      budget: "",
      project: "",
      referral: "",
    },
  });

  const onSubmit = async (
    values: ContactFormValues,
    event?: React.BaseSyntheticEvent
  ) => {
    setResult("Sending....");
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY || "");
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("website", values.website || "");
    formData.append("email", values.email);
    formData.append("help", values.help);
    formData.append("budget", values.budget || "");
    formData.append("project", values.project || "");
    formData.append("referral", values.referral || "");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      form.reset();
    } else {
      setResult(data.message);
    }
  };

  const goBack = () => {
    setIsGoingBack(true);
    setTimeout(() => {
      // Try to go back first, if that fails or if we're at the beginning, go to home
      if (window.history.length > 1) {
        router.back();
        // If we can't determine the previous route, default to home
        // The router.back() will handle the navigation
      } else {
        router.push("/");
      }
    }, 1300); // Match the animation duration
  };

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-[80vh] px-2 lg:py-20 text-slateBg transition-colors duration-700 z-[100]`}
    >
      <div className="fixed inset-0 z-[10] pointer-events-none">
        <div
          className={`w-full h-full bg-black ${
            isGoingBack ? "animate-radialBloomReverse" : "animate-radialBloom"
          }`}
          style={{}}
        />
      </div>
      <div className="w-full max-w-screen-2xl  z-[100]">
        <div className="w-full flex flex-col items-start rounded-2xl p-5">
          <h1 className="text-[60px] md:text-[80px] lg:text-[124px] leading-[60px] md:leading-[80px] lg:leading-[130px]  font-medium lg:pl-10 font-interTight z-[100]">
            Let&apos;s Connect
          </h1>
          <FormProvider {...form}>
            <form
              className="w-full lg:max-w-[1200px] mt-10 lg:mt-20 relative"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <button
                className="absolute top-[-180px] lg:top-[-210px] -right-5 z-[200] text-slateBg p-5"
                onClick={(e) => {
                  e.preventDefault();
                  goBack();
                }}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base lg:text-lg font-medium">
                        First name*
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Mark" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Last name*
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Scout" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6">
                <FormField
                  name="website"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Current website (if applicable)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="lumon.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Email*
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="mark.s@lumon.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6">
                <FormField
                  name="help"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base lg:text-lg font-medium">
                        What do you need help with?*
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue=""
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select one..." />
                          </SelectTrigger>
                          <SelectContent>
                            {helpOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6">
                <FormField
                  name="budget"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base lg:text-lg font-medium">
                        What&apos;s your budget?
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue=""
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select one..." />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6">
                <FormField
                  name="project"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Tell us a bit about the project
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Our current site looks like an old shoe..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6">
                <FormField
                  name="referral"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base lg:text-lg font-medium">
                        How did you find me?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Twitter" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-fit mt-8 text-lg font-medium py-6 bg-slateBg text-slateText shadow-none border border-border hover:bg-slateBg/80 rounded-none"
              >
                {result === "Sending...." ? (
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                ) : result === "Form Submitted Successfully" ? (
                  <Check className="w-6 h-6 mr-2" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
                Get started
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  goBack();
                }}
                className="w-fit mt-8 text-lg font-medium py-6 bg-transparent text-slateBg shadow-none border border-border hover:bg-slateText/80 rounded-none ml-6"
              >
                <ArrowLeft className="w-6 h-6 mr-2" />
                Back
              </Button>
              {/* <div className="text-center mt-4 text-sm min-h-[24px]">
                {result}
              </div> */}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
