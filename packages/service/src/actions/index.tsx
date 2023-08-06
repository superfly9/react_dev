import { createContact } from "../contact";

async function rootAction() {
  const contact = await createContact();
  return { contact };
}

export { rootAction as RootAction };
