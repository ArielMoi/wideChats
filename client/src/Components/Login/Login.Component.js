import { useAuth0 } from "@auth0/auth0-react";

const Login = (props) => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
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
