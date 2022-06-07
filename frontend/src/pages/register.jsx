import { useState } from "react";
import { FaUser} from "react-icons/fa";
import axios from "../api/axios";
import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";


const REGISTER_URL = '/users/register';

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const navigate = useNavigate();
    const { setAuth } = useUserContext();

    const [isError, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { name, email, password, password2 } = formData

    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await axios.post(`${REGISTER_URL}`, JSON.stringify({
                name,
                email,
                password,
                password2,
            }),
                {
                    headers: { 'Content-Type': 'application/json' }
                });


            console.log(JSON.stringify(response));

            if (response.status === 200) {
                console.log("success");
            }

            const token = response?.data?.token;
            const id = response?.data?.id;

            setAuth({
                id,
                token,
                name,
                email
            })
            setIsLoading(false);
            setError(false);
            navigate('/', { replace: true });

        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
                {isError && <p className="error" style={{
                    color: "red",
                    fontSize: "0.7rem",
                }}>{isError}</p>}

            </section>

            {isLoading ?

                <div className="loadingSpinnerContainer">
                    <div className="loadingSpinner"></div>
                </div>
                
                : <section className="form" onSubmit={onSubmit}>

                    <form>
                        <div className="form-group" >
                            <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange} />
                            <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
                            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
                            <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Enter your password again" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-block" />
                        </div>
                    </form>
                </section>}

        </>
    );
}

export default Register;
