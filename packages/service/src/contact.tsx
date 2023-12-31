import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { Contact } from "./types/contact";
import { CONTACT } from "./constant/contact";

type Contacts = Contact[];
export async function getContacts(query: string = "") {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem<Contacts | null>("contacts");
  if (contacts === null) {
    contacts = [];
  }
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let item = { ...CONTACT, id, createdAt: Date.now() };
  let contacts: Contacts = await getContacts();
  contacts.unshift(item);
  await set(contacts);
  return item;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem<Contacts | null>("contacts");

  if (contacts === null) {
    contacts = [];
  }

  let contact = contacts.find((contact) => contact.id === id);
  return contact;
}

type Updates = {
  [k: string]: FormDataEntryValue;
};

export async function updateContact(id: string, updates: Updates) {
  await fakeNetwork();
  let contacts = await localforage.getItem<Contacts | null>("contacts");
  if (contacts === null) {
    contacts = [];
  }
  let contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error("No contact found for", { cause: id });
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string) {
  let contacts = await localforage.getItem<Contacts | null>("contacts");
  if (contacts === null) {
    contacts = [];
  }
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: Contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen

interface FakeCache {
  [key: string]: boolean;
}
let fakeCache: FakeCache = {};

async function fakeNetwork(key: string = "") {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
