"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { userService } from "@/lib/server/services/userService";

const formSchema = z.object({
  name: z.string({
    required_error: "Username Required",
  }),
  email: z.string({
    required_error: "Email Required",
  }),
  password: z.string({
    required_error: "Password Required",
  }),
});

type UserFormValues = z.infer<typeof formSchema>;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const toastMessage = "Usuario Creado.";
  const action = "Crear Usuario";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await userService.newUser(values);

      toast({
        variant: "default",
        title: "Éxito",
        description: toastMessage,
      });

      router.push(`/`);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Incorrecto",
        description: error.response.data,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Email" {...field} />
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
                <Input
                  disabled={loading}
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
