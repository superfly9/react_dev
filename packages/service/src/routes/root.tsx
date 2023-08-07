import {
  NavLink,
  useNavigation,
  Outlet,
  useLoaderData,
  Form,
} from "react-router-dom";
import { RootLoader } from "../loader";

type RootLoaderReturn = Awaited<ReturnType<typeof RootLoader>>;

const routerStatus = (param: { isActive: boolean; isPending: boolean }) => {
  if (typeof param === "object") {
    const { isActive, isPending } = param;
    const status = (isActive && "active") || (isPending && "pending") || "";
    return status;
  }
};

export default function Root() {
  const { contacts } = useLoaderData() as RootLoaderReturn;
  const { state } = useNavigation();
  console.log(state);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={routerStatus}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={state === "loading" ? "loading" : ""}>
        {/* nested routing시 보여줄 컴포넌트를 대체 */}
        <Outlet />
      </div>
    </>
  );
}
