import { render, screen } from "@testing-library/react";
import Profile from "../../pages/Profile";
import useUsers from "../../hooks/useUsers";

jest.mock("../../hooks/useUsers");
const mockUseUsers = jest.mocked(useUsers);

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://example.com/avatar.png",
};

describe("Profile", () => {
  it("render profile page title", () => {
    mockUseUsers.mockImplementation(() => ({
      user: mockUser,
      signup: jest.fn(),
    }));
    render(<Profile />);

    const titleElement = screen.getByText(/Profile/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("render mocked user information", () => {
    mockUseUsers.mockImplementation(() => ({
      user: mockUser,
      signup: jest.fn(),
    }));
    render(<Profile />);

    const nameElement = screen.getByText(mockUser.name);
    expect(nameElement).toBeInTheDocument();

    const emailElement = screen.getByText(mockUser.email);
    expect(emailElement).toBeInTheDocument();

    const avatarElement = screen.getByAltText(mockUser.name);
    expect(avatarElement).toBeVisible();
  });
});
