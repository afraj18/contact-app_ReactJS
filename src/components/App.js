import React from 'react';
import './App.css';
// import HomePage from './HomePage';
import SignUp from './SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashBoard from './DashBoard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import firebaseCrud from '../firebaseCrud';

function App() {
    return (

        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }} >
            {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={DashBoard} />
                        <PrivateRoute exact path="/DashBoard" component={DashBoard} />
                        <PrivateRoute exact path="/UpdateProfile" component={UpdateProfile} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={Login} />
                        <Route path="/ForgotPassword" component={ForgotPassword} />
                        <Route path="/fireCrud" component={firebaseCrud} />
                    </Switch>
                </AuthProvider>
            </Router>
            {/* </div> */}
        </Container >

    );
}

export default App;
