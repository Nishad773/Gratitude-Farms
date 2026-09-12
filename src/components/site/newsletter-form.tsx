import { Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema, subscribeToUpdates } from "@/lib/enquiries";

type State = { status: "idle" | "sending" | "done"; error?: string };

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setState({
        status: "idle",
        error: parsed.error.issues[0]?.message ?? "Enter a valid email.",
      });
      return;
    }

    setState({ status: "sending" });
    try {
      await subscribeToUpdates({ data: parsed.data });
      setState({ status: "done" });
      setEmail("");
    } catch {
      setState({
        status: "idle",
        error: "We couldn't save that just now. Please email info@gramonnati.org instead.",
      });
    }
  }

  if (state.status === "done") {
    return (
      <p className="flex items-start gap-2 rounded-xl border border-sun/40 bg-sun/10 px-4 py-3 text-sm text-primary-foreground">
        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun" />
        You're on the list. Quarterly impact updates will land in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2">
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state.error) setState({ status: "idle" });
          }}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "newsletter-error" : undefined}
          className="h-11 rounded-full border-primary-foreground/25 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/50"
        />
        <Button
          type="submit"
          disabled={state.status === "sending"}
          className="h-11 w-full rounded-full bg-sun px-6 font-extrabold text-brand-strong shadow-none hover:bg-primary-foreground"
        >
          {state.status === "sending" ? (
            <>
              <Loader2 aria-hidden="true" className="animate-spin" /> Signing up
            </>
          ) : (
            "Keep me posted"
          )}
        </Button>
      </div>
      {state.error ? (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs font-semibold text-sun">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
