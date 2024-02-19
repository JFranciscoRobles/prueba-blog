"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        signIn("credentials", {
          redirect: false,
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
          // @ts-ignore
        }).then(({ error }) => {
          if (error) {
            setLoading(false);
            toast({
              variant: "destructive",
              title: "Incorrecto",
              description: "El usuario o contraeña son incorrectos.",
            });
          } else {
            router.refresh();
            router.push("/dashboard");
          }
        });
      }}
      className="flex flex-col w-full px-4 py-8 space-y-4 sm:px-16"
    >
      <div>
        <Label htmlFor="email">Correo Electronico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="saas@probien.mx"
        />
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="*******"
        />
      </div>
      <Button disabled={loading}>
        {loading ? "Cargando" : "Iniciar Sesión"}
      </Button>
    </form>
  );
}
