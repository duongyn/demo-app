import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import { validate, validatePassword } from '../../validation/validate';
import AuthService from "../../services/AuthService";
import LanguageContext from '../../contexts/LanguageContext';
import { useContext } from "react";

// const getText = (language, codeText) => {
//     const TEXTS = {
//       EMAIL: {
//         en: "Username",
//         vi: "Tên tài khoản"
//       },
//       PASSWORD: {
//         en: "Password",
//         vi: "Mật khẩu"
//       }
//     }
//     return TEXTS[codeText][language]
//   };

const LoginPage = () => {
    let navigate = useNavigate();
    const language = useContext(LanguageContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState({
        username: false,
        password: false
    });
    const [message, setMessage] = useState("");
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setMessage("");
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
        setMessage("");
    };

    const handleBlur = evt => {
        setTouched({
            ...touched,
            [evt.target.name]: true
        })
    }

    const errorUsername = validate(username);

    const errorPassword = validatePassword(password);

    const formValid = !errorUsername && !errorPassword;

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(
            () => {
                console.log("Logged in");
                navigate("/");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        );
    };
    return (
        <div style={{display: "block", width: "50%", marginLeft: "400px", marginTop: "50px"}}>
            <Form onSubmit={handleLogin} validated={false}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    {/* <Form.Label> {getText(language, "USERNAME")} </Form.Label> */}
                    <Form.Label> Username </Form.Label>
                    <Form.Control
                        required
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        onBlur={handleBlur}
                        type="username"
                        placeholder="Enter username"
                        isInvalid={touched.username && Boolean(errorUsername)}
                        isValid={touched.username && !Boolean(errorUsername)}
                    />
                    <Form.Control.Feedback type="invalid">{errorUsername}</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Valid Username</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    {/* <Form.Label>{getText(language, "PASSWORD")}</Form.Label> */}
                    <Form.Control
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        onBlur={handleBlur}
                        type="password"
                        placeholder="Password"
                        isInvalid={touched.password && Boolean(errorPassword)}
                        isValid={touched.password && !Boolean(errorPassword)}
                    />
                    <Form.Control.Feedback type="invalid">{errorPassword}</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Password look good</Form.Control.Feedback>
                </Form.Group>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <Button disabled={!formValid} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default LoginPage;
