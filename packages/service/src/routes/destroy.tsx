import { redirect, Params } from "react-router-dom";
import { deleteContact } from "../contact";

export async function destroyAction({
  params,
}: {
  params: Params<"contactId">;
}) {
  await deleteContact(params.contactId ?? "");
  return redirect("/");
}
