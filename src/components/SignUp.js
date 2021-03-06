import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { SignUp } = useAuth();

    async function HandleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await SignUp(emailRef.current.value, passwordRef.current.value);
            history.push("/login")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Sign Up
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
                        <Form.Group id="password-confirm">
                            <Form.Label> Confirm Password </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button className="w-100 mt-4" disabled={loading} type="submit">Sign Up</Button>

                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/Login">Log In</Link>
            </div>
        </>
    )
}