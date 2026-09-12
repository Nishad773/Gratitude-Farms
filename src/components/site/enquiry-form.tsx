import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  enquiryInterests,
  enquirySchema,
  submitEnquiry,
  type EnquiryInterest,
  type EnquiryValues,
} from "@/lib/enquiries";
import { org } from "@/content/site";
import { cn } from "@/lib/utils";

type Submitted = { reference: string; interest: EnquiryInterest };

export function EnquiryForm({
  defaultInterest = "CSR Partnership",
  className,
}: {
  defaultInterest?: EnquiryInterest;
  className?: string;
}) {
  const [submitted, setSubmitted] = useState<Submitted | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      organisation: "",
      email: "",
      phone: "",
      interest: defaultInterest,
      message: "",
      consent: false,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const interest = watch("interest");
  const consent = watch("consent");

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const result = await submitEnquiry({ data: values });
      setSubmitted({ reference: result.reference, interest: values.interest });
      reset({ ...form.formState.defaultValues, interest: values.interest } as EnquiryValues);
    } catch {
      setServerError(
        `We couldn't send that just now. Please email ${org.email} or call ${org.phone} and we'll pick it up from there.`,
      );
    }
  });

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-leaf/40 bg-leaf/10 p-7 text-center sm:p-10",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-brand" />
        <h3 className="display-face mt-5 text-2xl text-brand-strong">
          Thank you — that's with us.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Your enquiry about <strong className="text-brand-strong">{submitted.interest}</strong> has
          been logged. Someone from the Trust will come back to you within two working days.
        </p>
        <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">
          Your reference
        </p>
        <p className="display-face mt-1 text-2xl text-brand">{submitted.reference}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => setSubmitted(null)}
            className="h-11 rounded-full bg-brand px-6 font-extrabold text-primary-foreground shadow-none hover:bg-brand-strong"
          >
            Send another enquiry
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-brand/40 bg-transparent px-6 font-extrabold text-brand-strong shadow-none hover:bg-brand/10"
          >
            <a href={`mailto:${org.partnershipsEmail}`}>Email us directly</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("rounded-2xl border border-line-soft bg-warm-white p-6 sm:p-8", className)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message} required>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>

        <Field label="Organisation" htmlFor="organisation" error={errors.organisation?.message}>
          <Input
            id="organisation"
            autoComplete="organization"
            placeholder="Company, trust or platform (optional)"
            {...register("organisation")}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email?.message} required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone?.message} required>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 80959 99776"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>

        <Field
          label="I'm interested in"
          htmlFor="interest"
          error={errors.interest?.message}
          required
          className="sm:col-span-2"
        >
          <Select
            value={interest}
            onValueChange={(value) =>
              setValue("interest", value as EnquiryInterest, { shouldValidate: true })
            }
          >
            <SelectTrigger id="interest" className="w-full" aria-invalid={!!errors.interest}>
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {enquiryInterests.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Keeps the value in the native form payload for non-JS/autofill tooling. */}
          <input type="hidden" {...register("interest")} />
        </Field>

        <Field
          label="Message"
          htmlFor="message"
          error={errors.message?.message}
          required
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            rows={5}
            placeholder="Tell us what you have in mind — a budget range, a city, a timeline, or just a question."
            aria-invalid={!!errors.message}
            {...register("message")}
          />
        </Field>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) =>
            setValue("consent", checked === true, { shouldValidate: true })
          }
          aria-invalid={!!errors.consent}
          className="mt-0.5"
        />
        <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-ink-soft">
          You may contact me about this enquiry. We'll only use these details to reply — never for
          anything else, and never shared onward.
        </Label>
      </div>
      {errors.consent ? (
        <p role="alert" className="mt-2 text-xs font-semibold text-destructive">
          {errors.consent.message}
        </p>
      ) : null}

      {serverError ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {serverError}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 h-12 w-full rounded-full bg-brand px-8 font-extrabold text-primary-foreground shadow-none hover:bg-brand-strong sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" /> Sending
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label
        htmlFor={htmlFor}
        className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-strong"
      >
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-xs font-semibold text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
