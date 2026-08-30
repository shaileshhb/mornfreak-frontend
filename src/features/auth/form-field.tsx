import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const CONTROL_CLASSES =
  "h-10 rounded-md border bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
};

function FieldShell({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-sans text-sm font-medium text-foreground"
      >
        {label}
        {optional ? (
          <span className="ml-1.5 font-normal text-muted-foreground">
            (optional)
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="font-sans text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="font-sans text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...props
}: FieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          CONTROL_CLASSES,
          error ? "border-destructive" : "border-input focus:border-ring",
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
}

export type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id"
> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function SelectField({
  id,
  label,
  error,
  hint,
  className,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          CONTROL_CLASSES,
          error ? "border-destructive" : "border-input focus:border-ring",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
