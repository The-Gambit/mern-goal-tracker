import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData

    

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
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form>
                    <div className="form-group" onSubmit={onSubmit}>
                        <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange} />
                        <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Enter your email"  onChange={onChange}/>
                        <input type="text" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange}/>
                        <input type="text" className="form-control" id="password2" name="password2" value={password2} placeholder="Enter your password again" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-block" />
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
