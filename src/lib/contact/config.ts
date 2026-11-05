import { OFFICIAL_CONTACT_EMAIL } from "@/lib/contact/constants";

export { OFFICIAL_CONTACT_EMAIL };

export function getContactRecipient() {
  return process.env.MATCHIDS_CONTACT_EMAIL?.trim() || OFFICIAL_CONTACT_EMAIL;
}