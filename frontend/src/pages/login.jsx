import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password } = formData

    

    const onChange = (e) => {
        setFormData(state => ({
          ...state,
          [e.target.name] : e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className="form">
                <form>
                    <div className="form-group" onSubmit={onSubmit}>
                        <input type="text" className="form-control" id="email" name="name" value={email} placeholder="Enter your email" onChange={onChange}/>
                        <input type="text" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-block" />
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
