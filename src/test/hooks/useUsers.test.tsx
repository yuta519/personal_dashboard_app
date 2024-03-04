import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { renderHook, act } from "@testing-library/react";
import useUsers from "../../hooks/useUsers";

const initialState = {
  name: undefined,
  email: undefined,
  location: undefined,
  avatar: undefined,
};

const mockStore = configureStore([]);
const store = mockStore({ user: initialState });

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

test("initial user state", () => {
  const { result } = renderHook(() => useUsers(), { wrapper });
  expect(result.current.user).toBe(initialState);
});

test("signup", () => {
  const { result } = renderHook(() => useUsers(), { wrapper });
  expect(result.current.user).toBe(initialState);

  const newUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.png",
  };

  act(() => {
    result.current.signup(newUser.name, newUser.email, newUser.avatar);
  });

  const actions = store.getActions();
  expect(actions).toEqual([{ type: "user/addUser", payload: newUser }]);

  // Will test the updated state in the next section
});
