import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const host = "http://localhost:5000";

const Login = () => {
    const refEmail = useRef(null);
    const refPassword = useRef(null);

    // useNavigate is used to change to a different page
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // API call
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: refEmail.current.value,
                password: refPassword.current.value,
            }),
        });

        const json = await response.json();
        console.log(json);

        if (json.success === true) {
            // save the authentication token and redirect
            localStorage.setItem("token", json.authToken);
            navigate("/");
        } else {
            alert(json.error);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        ref={refEmail}
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        ref={refPassword}
                        name="password"
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
