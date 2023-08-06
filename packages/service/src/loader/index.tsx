import { getContact, getContacts } from "../contact";

async function rootLoader() {
  const contacts = await getContacts();
  return { contacts };
}

const contactLoader = async ({ params }: any) => {
  let contact = await getContact(params.contactId);

  return { contact };
};

export { rootLoader as RootLoader, contactLoader };
