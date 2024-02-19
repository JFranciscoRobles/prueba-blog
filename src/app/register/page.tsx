"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
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
import { userService } from "@/services/userService";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  initialData: (UserFormValues & User) | null;
}

const Page: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const toastMessage = "Usuario Creado.";
  const action = "Crear Usuario";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      await userService.newUser(data);

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
  };

  return (
    <div className="w-full p-8">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Nombre"
                        {...field}
                      />
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
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Nombre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="w-full" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
