import React from 'react'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import './Register.scss'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            username: '',
            password: '',
            location: '',
            formErr: [],
        }
    }

    handleChange(e, elemName) {
        switch (elemName) {
            case 'email':
                this.setState({
                    email: e.target.value
                })
                break
            case 'username':
                this.setState({
                    username: e.target.value
                })
                break
            case 'password':
                this.setState({
                    password: e.target.value
                })
                break
            case 'location':
                this.setState({
                    location: e.target.value
                })
                break
                default:
        }
    }

    handleFormSubmission(e) {
        e.preventDefault()

        const userObject = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            location: this.state.location
        }

        // make api call to register
        axios.post('http://localhost:5000/api/v1/users/register', qs.stringify(userObject))
            .then(response => {

                console.log(response.data)

                this.props.cookies.set('token', response.data.token, {
                    path: '/',
                    expires: moment.unix(response.data.expiresAt).toDate()
                })

                this.props.history.push('/users/profile')

                // clear form messages
                this.setState({
                    email: '',
                    username: '',
                    password: '',
                    location: '',
                    formErr: [],
                })

            })

            .catch(err => {
                this.setState({
                    formErr: "Username or email is taken, please try again"
                })
            })


    }

    render() {
        return (
            <div className="page-login">
                <div className="container">
                    <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" value={this.state.email} onChange={e => { this.handleChange(e, 'email') }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputUser1">Username</label>
                            <input type="text" value={this.state.username} onChange={e => { this.handleChange(e, 'username') }} className="form-control" id="exampleInputUser1" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" value={this.state.password} onChange={e => { this.handleChange(e, 'password') }} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputLocation1">Location</label>
                            <input type="text" value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} className="form-control" id="exampleInputLocation1" />
                        </div>
                        {
                            this.state.formErr !== "" ? (
                                <div className="form-group">
                                    <p>{this.state.formErr}</p>
                                </div>
                            ) : (
                                    ""
                                )
                        }
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(withCookies(Login))

