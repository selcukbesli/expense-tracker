import { DefaultRequestBody, rest } from "msw";

import { Category } from "../types/category";
import { LoginForm, User } from "../types/user";
import { baseUrl } from "../test/constants";

export const handlers = [
  // Handles a POST /login request
  rest.post<LoginForm, User>(`${baseUrl}/users/login`, (req, res, ctx) => {
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
  rest.get<DefaultRequestBody, Category[]>(
    `${baseUrl}/categories`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 250, name: "Education", type: "expense", color: "#db3e00" },
          { id: 251, name: "Salary", type: "income", color: "#008b02" },
        ])
      );
    }
  ),

  rest.post<DefaultRequestBody, { message: string }>(
    `${baseUrl}/users/register`,
    (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({ message: "User registration is successful." })
      );
    }
  ),
];
