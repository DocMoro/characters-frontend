import { useCallback, useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { PATHS } from "../../constants/constants";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import AuthService from "../../service/AuthService/AuthService";

export default function AuthorizedNavbar() {
  const { setCurrentUser } = useContext(CurrentUserContext);

  const handleExitButtonClick = useCallback(async () => {
    const { hasError } = await AuthService.logout();
    if (!hasError) {
      setCurrentUser({
        email: "",
        role: "",
        isActivated: false,
      });
    }
  }, [setCurrentUser]);

  return (
    <Navbar className="w-100 p-0 m">
      <Nav className="flex-grow-1 justify-content-start">
        <Nav.Link as={Link} to={PATHS.spells}>
          Заклинания
        </Nav.Link>
        <Nav.Link as={Link} to={PATHS.characters}>
          Чарники
        </Nav.Link>
        <Nav.Link
          as={Button}
          variant="link"
          onClick={handleExitButtonClick}
          className="me-0 ms-auto"
        >
          Выход
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
