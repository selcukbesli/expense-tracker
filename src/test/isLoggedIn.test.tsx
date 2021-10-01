import { render, screen } from "../test/test-utils";

import App from "../App";
import { server } from "../mocks/server";
import { rest } from "msw";
import { baseUrl } from "./constants";

test("should NOT auto login after refresh, when invalid token stored in localStorage", async () => {
  server.resetHandlers(
    rest.post<{ token: string }, { errorMessage: string }>(
      `${baseUrl}/users/is_logged_in`,
      (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({ errorMessage: "Invalid token" })
        );
      }
    )
  );

  // set localstorage a invalid token
  localStorage.setItem("jwt", "invalid-token");

  render(<App />);

  // expect only loginMenuItem appear and localstorage jwt is null
  const loginMenuItem = await screen.findByRole("menuitem", {
    name: /login/i,
  });
  expect(loginMenuItem).toBeInTheDocument();
  expect(localStorage.getItem("jwt")).toBeNull();
});

test("should auto login after refresh when valid token stored in localStorage", async () => {
  // set localstorage a valid token
  localStorage.setItem("jwt", "valid-token");

  render(<App />);

  // expect to have 3 menuItems on the page after login successfully
  const menuItems = await screen.findAllByRole("menuitem");
  expect(menuItems).toHaveLength(3);
});
