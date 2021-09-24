import React, { useState } from 'react'
import HomePage from './HomePage'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';



export default function DashBoard() {
    const [error, setError] = useState();
    const { currentUser, Logout } = useAuth();
    const history = useHistory();

    function HandleLogout() {
        setError('')
        Logout();
        history.push('/Login')
    }
    return (
        <div className="w-100 mt-5" style={{ maxWidth: "900px" }}>
            <Card>
                <Card.Body className="text-center">
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="Danger">{error}</Alert>}
                    <strong>
                        Email :
                    </strong > {currentUser.email}
                    <Link to="/UpdateProfile" className="text-center btn btn-primary btn-sm mt-3 w-100">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="text-center w-100">
                <Button variant="link" onClick={HandleLogout}>Log Out </Button>
            </div>
            {/* //ContactApp */}
            <HomePage />

        </div>
    )
}
