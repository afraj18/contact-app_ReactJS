import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { signup, useAuth } from '../context/AuthContext';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { Login } = useAuth();

    async function HandleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await Login(emailRef.current.value, passwordRef.current.value);
            history.push("/DashBoard")
        } catch {
            setError("Failed to Login")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Log In
                    </h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={HandleSubmit}>
                        <Form.Group id="email">
                            <Form.Label> E-Mail </Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Button className="w-100 mt-4" disabled={loading} type="submit">Log In</Button>

                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/SignUp">Sign Up</Link>
            </div>
        </>
    )
}