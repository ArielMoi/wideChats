const Login = () => {
    return (
        <div>
            <form>
                <label>choose username</label>
                <input type="text" name='username' required></input>
                {/* <label>room</label>
                <input type="text" name='room' required></input> */}
                <button type='submit'>Enter</button>
                <button>create a new id</button>
            </form>
        </div>
    )
}

export default Login;