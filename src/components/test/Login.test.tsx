import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { render, screen, waitFor } from "../../test/test-utils";

import { server } from "../../mocks/server";
import { baseUrl } from "../../test/constants";
import Login from "../Login";
import { LoginForm } from "../../types/user";

test("should error message seen on screen if credentials are false", async () => {
  server.resetHandlers(
    rest.post<LoginForm, { errorMessage: string }>(
      `${baseUrl}/users/login`,
      (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: "User does not exist",
          })
        );
      }
    )
  );

  render(<Login />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.clear(usernameInput);
  userEvent.type(usernameInput, "selcuk");

  userEvent.clear(passwordInput);
  userEvent.type(passwordInput, "123456");

  userEvent.click(submitButton);

  const errorMessage = await screen.findByText(/user\/login\/rejected/i);
  expect(errorMessage).toBeInTheDocument();
});

test("should alerts appear/disappear under inputs, after clicking submit depends on credentials", async () => {
  render(<Login />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.clear(usernameInput);
  userEvent.clear(passwordInput);
  userEvent.click(submitButton);

  await waitFor(() => {
    const usernameAlert = screen.getByText(/please input your username!/i);
    const passwordAlert = screen.getByText(/please input your password!/i);
    expect(usernameAlert).toBeInTheDocument();
    expect(passwordAlert).toBeInTheDocument();
  });

  userEvent.type(usernameInput, "selcuk");
  await waitFor(() => {
    const usernameAlert = screen.queryByText(/please input your username!/i);
    expect(usernameAlert).not.toBeInTheDocument();
  });

  userEvent.type(passwordInput, "12345");
  await waitFor(() => {
    const passwordAlert = screen.getByText(/please input your password!/i);
    expect(passwordAlert).toBeInTheDocument();
  });

  userEvent.type(passwordInput, "6");

  await waitFor(() => {
    const passwordAlert = screen.queryByText(/please input your password!/i);
    expect(passwordAlert).not.toBeInTheDocument();
  });
});
