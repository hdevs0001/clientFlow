"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GitMerge, GlobeCheck } from "lucide-react";

export default function LoginPage() {
  return (
<div className="min-h-screen bg-gradient-to-br from-background via-background to-violet-950/20 flex items-center justify-center px-4">
     <Card className="w-full max-w-md border-violet-500/20 bg-background/80 backdrop-blur-xl shadow-2xl">
        <CardContent className="p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to access your ClientFlow dashboard
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Button
              variant="outline"
              className="w-full h-11"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <GlobeCheck className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-11"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <GitMerge className="mr-2 h-5 w-5" />
              Continue with GitHub
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Secure authentication powered by OAuth
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
