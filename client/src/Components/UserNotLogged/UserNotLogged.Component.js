import Login from '../Login/Login.Component'

const UserNotLogged = () => {
    return(<div>
        <h1>Please Log in</h1>
        <h5>unfortunately you cant make this action as a un logged user</h5>
        <h4>please log \ sign in.</h4>
        <Login />
    </div>)
}

export default UserNotLogged;