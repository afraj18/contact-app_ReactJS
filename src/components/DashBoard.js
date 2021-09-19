import React, { useState } from 'react'
import HomePage from './HomePage'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

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
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="Danger">{error}</Alert>}
                    <strong>
                        Email :
                    </strong> {currentUser.email}
                </Card.Body>
            </Card>
            <div className="text-center w-100">
                <Button variant="link" onClick={HandleLogout}>Log Out </Button>
            </div>
            <HomePage />
        </div>
    )
}
