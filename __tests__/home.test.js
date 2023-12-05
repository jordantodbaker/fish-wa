import { render, screen } from "@testing-library/react";
import Home from "../app/page.tsx";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser() {
    return {
      user: { email: "test" },
      isLoading: false,
    };
  },
}));

jest.mock("../generated/graphql-frontend", () => ({
  useUserQuery() {
    return {
      data: { user: { stockingReports: [] } },
      loading: false,
      error: {},
    };
  },
  useCountiesQuery() {
    return {
      data: { counties: [] },
      loading: false,
      error: {},
    };
  },
  useUpdateUserLakesMutation() {
    return [() => {}, { loading: false }];
  },
}));

describe("Home", () => {
  it("renders a subscribe button", () => {
    render(<Home />);

    const heading = screen.getByRole("button", {
      name: "Subscribe",
    });

    expect(heading).toBeInTheDocument();
  });
});
