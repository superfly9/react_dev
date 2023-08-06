import { createContact } from "../contact";
import { redirect } from "react-router-dom";

async function rootAction() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export { rootAction as RootAction };
