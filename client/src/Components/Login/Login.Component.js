import { useAuth0 } from "@auth0/auth0-react";
import Button from '../Button/Button.Component'

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Button onClick={() => loginWithRedirect()} text='Log In' />
    </div>
  );
};

export default Login;
