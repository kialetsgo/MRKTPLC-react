import React from 'react'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import Ajv from 'ajv'
import LoginValidationSchema from '../../validation-schemas/login'
import { withCookies } from 'react-cookie'
import { withRouter, Link } from 'react-router-dom'
import './Login.scss'

const ajv = new Ajv({ allErrors: true })

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            formErr: [],
        }
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswrdChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleFormSubmission(e) {
        e.preventDefault()

        this.setState({
            formErr: []
        })

        // validate form
        const formValid = this.validateFormInputs()

        if (formValid) {

            // make api call to login
            axios.post('http://localhost:5000/api/v1/users/login', qs.stringify({
                email: this.state.email,
                password: this.state.password,
            }))
                .then(response => {
                    if (!response.data.success) {
                        this.setState({
                            formErr: "Email or username is incorrect, please try again"
                        })
                        return
                    }

                    this.props.cookies.set('token', response.data.token, {
                        path: '/',
                        expires: moment.unix(response.data.expiresAt).toDate()
                    })

                    this.props.history.push('/users/profile')
                })

                .catch(err => {
                    this.setState({
                        formErr: "Email or username is incorrect, please try again"
                    })
                })

        }

    }

    validateFormInputs() {
        const err = []

        const formValid = ajv.validate(LoginValidationSchema, this.state)

        if (!formValid) {
            ajv.errors.forEach(e => {
                let field = e.dataPath.toUpperCase()
                err.push(`${field} field ${e.message}`)
            })
        }

        if (err.length === 0) {
            return true
        }

        this.setState({
            formErr: err
        })

        return false
    }

    render() {
        return(
            <div id="page-login">

                <div className="container marginTop">

                    <form className="mt-5 mb-5" onSubmit={ e => { this.handleFormSubmission(e) } }>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" onChange={ e => { this.handleEmailChange(e) } } className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" onChange={ e => { this.handlePasswrdChange(e) } } className="form-control" id="exampleInputPassword1" />
                        </div>

                        {
                            this.state.formErr.length > 0 ?
                            (
                                <div className="form-group">
                                    {
                                        this.state.formErr.map(msg => {
                                            return (
                                                <p>{msg}</p>
                                            )
                                        })
                                    }
                                </div>
                            ) :
                            ''
                        }
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>

                    <hr />

                    <Link to="/users/register" class="btn btn-primary active" id="reg-btn" role="button" aria-pressed="true">Register New Account</Link>

                </div>

            </div>
        )
    }
}

export default withRouter(withCookies(Login))
