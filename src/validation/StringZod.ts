// deno-lint-ignore-file no-explicit-any
import type { YelixInput } from "@/src/validation/inp.ts";
import {
  type FailedMessage,
  YelixValidationBase,
} from "@/src/validation/ValidationBase.ts";

class StringZod extends YelixValidationBase {
  private input: YelixInput;

  constructor(_input: YelixInput) {
    super();
    this.input = _input;
  }

  required(failedMessage?: FailedMessage): this {
    this.addRule(
      "required",
      (value: any) => {
        return {
          isOk: value !== undefined && value !== null,
        };
      },
      failedMessage ? failedMessage : "This field is required.",
    );
    return this;
  }

  trim(failedMessage?: FailedMessage): this {
    this.addRule(
      "trim",
      (value: any) => {
        return {
          isOk: typeof value === "string",
          newValue: value.trim(),
        };
      },
      failedMessage ? failedMessage : "This field is not a string.",
    );
    return this;
  }

  max(maxLength: number, failedMessage?: FailedMessage): this {
    this.addRule(
      "max",
      (value: any) => ({
        isOk: typeof value === "string" && value.length <= maxLength,
      }),
      failedMessage
        ? failedMessage
        : () => `String must be at most ${maxLength} characters long`,
    );
    return this;
  }

  min(minLength: number, failedMessage?: FailedMessage): this {
    this.addRule(
      "min",
      (value: any) => ({
        isOk: typeof value === "string" && value.length >= minLength,
      }),
      failedMessage
        ? failedMessage
        : () => `String must be at least ${minLength} characters long`,
    );
    return this;
  }

  length(exactLength: number, failedMessage?: FailedMessage): this {
    this.addRule(
      "length",
      (value: any) => ({
        isOk: typeof value === "string" && value.length === exactLength,
      }),
      failedMessage
        ? failedMessage
        : `String must be exactly ${exactLength} characters long`,
    );
    return this;
  }

  email(failedMessage?: FailedMessage): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.addRule(
      "email",
      (value: any) => ({
        isOk: typeof value === "string" && emailRegex.test(value),
      }),
      failedMessage ? failedMessage : "Invalid email address",
    );
    return this;
  }

  url(failedMessage?: FailedMessage): this {
    this.addRule(
      "url",
      (value: any) => {
        try {
          new URL(value);
          return { isOk: true };
        } catch {
          return { isOk: false };
        }
      },
      failedMessage ? failedMessage : "Invalid URL",
    );
    return this;
  }

  regex(pattern: RegExp, failedMessage?: FailedMessage): this {
    this.addRule(
      "regex",
      (value: any) => ({
        isOk: typeof value === "string" && pattern.test(value),
      }),
      failedMessage ? failedMessage : "String does not match pattern",
    );
    return this;
  }

  includes(searchString: string, failedMessage?: FailedMessage): this {
    this.addRule(
      "includes",
      (value: any) => ({
        isOk: typeof value === "string" && value.includes(searchString),
      }),
      failedMessage ? failedMessage : `String must include "${searchString}"`,
    );
    return this;
  }

  startsWith(searchString: string, failedMessage?: FailedMessage): this {
    this.addRule(
      "startsWith",
      (value: any) => ({
        isOk: typeof value === "string" && value.startsWith(searchString),
      }),
      failedMessage
        ? failedMessage
        : `String must start with "${searchString}"`,
    );
    return this;
  }

  endsWith(searchString: string, failedMessage?: FailedMessage): this {
    this.addRule(
      "endsWith",
      (value: any) => ({
        isOk: typeof value === "string" && value.endsWith(searchString),
      }),
      failedMessage ? failedMessage : `String must end with "${searchString}"`,
    );
    return this;
  }

  datetime(failedMessage?: FailedMessage): this {
    const isoDatetimeRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[-+]\d{2}:?\d{2})?$/;
    this.addRule(
      "datetime",
      (value: any) => ({
        isOk: typeof value === "string" && isoDatetimeRegex.test(value),
      }),
      failedMessage ? failedMessage : "Invalid ISO 8601 datetime",
    );
    return this;
  }

  ip(failedMessage?: FailedMessage): this {
    const ipv4Regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex =
      /^(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?:(?::[a-fA-F0-9]{1,4}){1,6})|:(?:(?::[a-fA-F0-9]{1,4}){1,7}|:))$/;
    this.addRule(
      "ip",
      (value: any) => ({
        isOk: typeof value === "string" &&
          (ipv4Regex.test(value) || ipv6Regex.test(value)),
      }),
      failedMessage ? failedMessage : "Invalid IP address",
    );
    return this;
  }

  toLowerCase(failedMessage?: FailedMessage): this {
    this.addRule(
      "toLowerCase",
      (value: any) => ({
        isOk: typeof value === "string",
        newValue: value.toLowerCase(),
      }),
      failedMessage ? failedMessage : "Value must be a string",
    );
    return this;
  }

  toUpperCase(failedMessage?: FailedMessage): this {
    this.addRule(
      "toUpperCase",
      (value: any) => ({
        isOk: typeof value === "string",
        newValue: value.toUpperCase(),
      }),
      failedMessage ? failedMessage : "Value must be a string",
    );
    return this;
  }

  date(failedMessage?: FailedMessage): this {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    this.addRule(
      "date",
      (value: any) => ({
        isOk: typeof value === "string" && dateRegex.test(value),
      }),
      failedMessage ? failedMessage : "Invalid ISO date format (YYYY-MM-DD)",
    );
    return this;
  }

  time(failedMessage?: FailedMessage): this {
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?$/;
    this.addRule(
      "time",
      (value: any) => ({
        isOk: typeof value === "string" && timeRegex.test(value),
      }),
      failedMessage
        ? failedMessage
        : "Invalid ISO time format (HH:mm:ss[.SSSSSS])",
    );
    return this;
  }

  base64(failedMessage?: FailedMessage): this {
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    this.addRule(
      "base64",
      (value: any) => ({
        isOk: typeof value === "string" && base64Regex.test(value),
      }),
      failedMessage ? failedMessage : "Invalid base64 string",
    );
    return this;
  }
}

export { StringZod };
