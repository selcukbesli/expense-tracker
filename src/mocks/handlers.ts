import { rest } from "msw";

import { LoginForm, User } from "../types/user";

export const handlers = [
  // Handles a POST /login request
  rest.post<LoginForm, User>("/login", (req, res, ctx) => {
    const { username } = req.body;

    return res(
      ctx.status(201),
      ctx.json({
        username,
        message: "Login Successfull",
        email: "johndoe@gmail.com",
        full_name: "John Doe",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1Mzk3NDcwLCJleHAiOjE2MjU0ODM4NzB9.gnobD0fMfOuSbAdr_MqKa1uqLaAKJayvPaeEac9I1iI",
      })
    );
  }),
];
