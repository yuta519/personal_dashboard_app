import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import useUsers from "../hooks/useUsers";

const Root = () => {
  const { user } = useUsers();
  if (!user.email || !user.name) window.location.href = "/signup";

  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Root;
