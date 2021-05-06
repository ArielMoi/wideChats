import { useAuth0 } from "@auth0/auth0-react";
import Button from '../Button/Button.Component'

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h3>Unregistered User</h3>
      <p>please log in to chat away!</p>
      <Button onClick={() => loginWithRedirect()} text='Log In' />
    </div>
  );
  // return (
  //     <div>
  //         <form>
  //             <label>choose username</label>
  //             <input type="text" name='username' required></input>
  //             {/* <label>room</label>
  //             <input type="text" name='room' required></input> */}
  //             <button type='submit' onClick={props.onClick}>Enter</button>
  //         </form>
  //     </div>
  // )
};

export default Login;
