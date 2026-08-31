"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  customerAccountGraphql,
  hasRefreshToken,
  readUnexpiredAccessToken,
  type CustomerAddressInput,
} from "@/lib/shopify-auth";

export type ActionResult = { ok: true } | { ok: false; error: string };

type UserError = { field?: string[] | null; message?: string | null };

function firstError(errors?: UserError[] | null): string | null {
  const message = errors?.find((error) => error.message)?.message;
  return message ?? null;
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function addressFromForm(formData: FormData): CustomerAddressInput {
  const input: CustomerAddressInput = {};
  const fields = [
    "firstName",
    "lastName",
    "company",
    "address1",
    "address2",
    "city",
    "zip",
    "zoneCode",
    "territoryCode",
    "phoneNumber",
  ] as const;

  for (const field of fields) {
    const value = readString(formData, field);
    if (!value) continue;
    input[field] =
      field === "territoryCode" || field === "zoneCode" ? value.toUpperCase() : value;
  }

  return input;
}

async function redirectToAuth(): Promise<never> {
  redirect(
    (await hasRefreshToken())
      ? "/api/auth/refresh?next=/account"
      : "/api/auth/login",
  );
}

async function ensureAuthenticated(): Promise<void> {
  if (!(await readUnexpiredAccessToken())) {
    await redirectToAuth();
  }
}

async function mutate<T extends Record<string, { userErrors?: UserError[] | null }>>(
  query: string,
  variables: Record<string, unknown>,
  key: keyof T,
): Promise<ActionResult> {
  await ensureAuthenticated();

  const result = await customerAccountGraphql<T>(query, variables);
  if (!result.ok) {
    if (result.status === "unauthenticated") {
      await redirectToAuth();
    }
    return { ok: false, error: "Shopify could not save that change. Try again." };
  }

  const payload = result.data[key];
  if (!payload) {
    return { ok: false, error: "Shopify could not save that change. Try again." };
  }

  const error = firstError(payload.userErrors);
  if (error) return { ok: false, error };

  revalidatePath("/account", "layout");
  return { ok: true };
}

const UPDATE_PROFILE = /* GraphQL */ `
  mutation UpdateProfile($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        firstName
        lastName
      }
    }
  }
`;

const CREATE_ADDRESS = /* GraphQL */ `
  mutation CreateAddress($address: CustomerAddressInput!, $defaultAddress: Boolean) {
    customerAddressCreate(address: $address, defaultAddress: $defaultAddress) {
      userErrors {
        field
        message
      }
      customerAddress {
        id
      }
    }
  }
`;

const UPDATE_ADDRESS = /* GraphQL */ `
  mutation UpdateAddress(
    $addressId: ID!
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
  ) {
    customerAddressUpdate(
      addressId: $addressId
      address: $address
      defaultAddress: $defaultAddress
    ) {
      userErrors {
        field
        message
      }
      customerAddress {
        id
      }
    }
  }
`;

const DELETE_ADDRESS = /* GraphQL */ `
  mutation DeleteAddress($addressId: ID!) {
    customerAddressDelete(addressId: $addressId) {
      userErrors {
        field
        message
      }
      deletedAddressId
    }
  }
`;

const SUBSCRIBE_EMAIL = /* GraphQL */ `
  mutation SubscribeEmailMarketing {
    customerEmailMarketingSubscribe {
      userErrors {
        field
        message
      }
      emailAddress {
        marketingState
      }
    }
  }
`;

const UNSUBSCRIBE_EMAIL = /* GraphQL */ `
  mutation UnsubscribeEmailMarketing {
    customerEmailMarketingUnsubscribe {
      userErrors {
        field
        message
      }
      emailAddress {
        marketingState
      }
    }
  }
`;

export async function updateProfile(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  return mutate<{ customerUpdate: { userErrors?: UserError[] | null } }>(
    UPDATE_PROFILE,
    {
      input: {
        firstName: readString(formData, "firstName"),
        lastName: readString(formData, "lastName"),
      },
    },
    "customerUpdate",
  );
}

export async function saveAddress(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const address = addressFromForm(formData);
  if (!address.address1 || !address.city || !address.territoryCode) {
    return {
      ok: false,
      error: "Address, city, and country code are required.",
    };
  }

  const addressId = readString(formData, "addressId");
  const defaultAddress = formData.get("defaultAddress") === "on";

  if (addressId) {
    return mutate<{ customerAddressUpdate: { userErrors?: UserError[] | null } }>(
      UPDATE_ADDRESS,
      { addressId, address, defaultAddress },
      "customerAddressUpdate",
    );
  }

  return mutate<{ customerAddressCreate: { userErrors?: UserError[] | null } }>(
    CREATE_ADDRESS,
    { address, defaultAddress },
    "customerAddressCreate",
  );
}

export async function deleteAddress(addressId: string): Promise<ActionResult> {
  if (!addressId) return { ok: false, error: "Missing address." };

  return mutate<{ customerAddressDelete: { userErrors?: UserError[] | null } }>(
    DELETE_ADDRESS,
    { addressId },
    "customerAddressDelete",
  );
}

export async function setEmailMarketing(subscribed: boolean): Promise<ActionResult> {
  return mutate<{
    customerEmailMarketingSubscribe?: { userErrors?: UserError[] | null };
    customerEmailMarketingUnsubscribe?: { userErrors?: UserError[] | null };
  }>(
    subscribed ? SUBSCRIBE_EMAIL : UNSUBSCRIBE_EMAIL,
    {},
    subscribed
      ? "customerEmailMarketingSubscribe"
      : "customerEmailMarketingUnsubscribe",
  );
}
