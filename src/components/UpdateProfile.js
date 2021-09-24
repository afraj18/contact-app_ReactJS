import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { currentUser, updateEmail, updatePassword } = useAuth();

    function HandleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        const promises = [];
        setError('')
        setLoading(true)

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setError("Failed to update Profile")
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <>
            <div className="w-100 mt-5" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">
                            Update Profile
                        </h2>
                        {/* {currentUser.email} */}
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={HandleSubmit}>
                            <Form.Group id="email">
                                <Form.Label> E-Mail </Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder="Leave Blank to keep same" />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label> Confirm Password </Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave Blank to keep same" />
                            </Form.Group>
                            <Button className="w-100 mt-4" disabled={loading} type="submit">Update</Button>

                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div>
            </div>

        </>
    )
}