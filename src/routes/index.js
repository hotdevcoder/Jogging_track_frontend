import React from 'react'
import { BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import Login from './Login'
import Signup from './Signup'
const routes = ({isAuthenticated}) => (
    <Router>
        <div>
            <Container className='main-content'>
                <Route exact path='/' render={() => (
                    isAuthenticated ? (
                        <Redirect to="/signup"/>
                        ) : (
                            <Redirect to="signup"/>
                        )
                )}/>
                <Route path="/login" >
                    <Login></Login> 
                </Route>
                <Route path="/signup" >
                    <Signup></Signup> 
                </Route>
            </Container>
        </div>
    </Router>
)
const selector = (state) => ({
    isAuthenticated: !!state.auth.me
})

export default connect(selector)(routes)