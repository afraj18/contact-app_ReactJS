import React from 'react';
import './App.css';
import HomePage from './HomePage';
import SignUp from './SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashBoard from './DashBoard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';

function App() {
    return (

        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }} >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={DashBoard} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/login" component={Login} />
                            <Route path="/DashBoard" component={DashBoard} />
                            <Route path="/ForgotPassword" component={ForgotPassword} />


                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>

    );
}

export default App;
