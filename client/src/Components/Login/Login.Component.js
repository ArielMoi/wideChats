const Login = () => {
    return (
        <div>
            <form>
                <label>username</label>
                <input type="text" required></input>
                <label>email</label>
                <input type="text" required></input>
                <button type='submit'>Login</button>
                <button>create a new id</button>
            </form>
        </div>
    )
}

export default Login;