import React from 'react'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import Ajv from 'ajv'
import RegistrationValidationSchema from '../../validation-schemas/registration'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import './Register.scss'

const ajv = new Ajv({ allErrors: true })
class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            username: '',
            password: '',
            location: '',
            formErr: [],
            formMsg: []
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

        this.setState({
            formErr: [],
            formMsg: []
        })

        // validate form
        const formValid = this.validateFormInputs()

        if (formValid) {

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

                    // // clear form messages
                    // this.setState({
                    //     email: '',
                    //     username: '',
                    //     password: '',
                    //     location: '',
                    //     formErr: [],
                    //     formMsg: []
                    //     })

                    this.props.history.push('/users/profile')

                })

                .catch(err => {
                    console.log(err)
                    this.setState({
                        formMsg: "Username or email is taken, please try again"
                    })
                })

        }

    }

    validateFormInputs() {
        const err = []

        const formValid = ajv.validate(RegistrationValidationSchema, this.state)

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
        return (
            <div id="page-register">
                <div className="container">
                    <div className="wrapper">

                        <div className="form-input">
                            <div className="row">
                                <div className="col-md-4 offset-md-4">


                                <div className="titleDiv">
                                    <p className="title">Register</p>
                                </div>


                                    <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                                        <div className="form-group">
                                            <label className="entryTitle" htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" value={this.state.email} onChange={e => { this.handleChange(e, 'email') }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label className="entryTitle" htmlFor="exampleInputUser1">Username</label>
                                            <input type="text" value={this.state.username} onChange={e => { this.handleChange(e, 'username') }} className="form-control" id="exampleInputUser1" />
                                        </div>
                                        <div className="form-group">
                                            <label className="entryTitle" htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" value={this.state.password} onChange={e => { this.handleChange(e, 'password') }} className="form-control" id="exampleInputPassword1" />
                                        </div>
                                        <div className="form-group">
                                            <label className="entryTitle" htmlFor="location">Select Area</label>
                                            <select className="form-control" value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} id="location">
                                                <option>Please select</option>
                                                <option>Ang Mo Kio</option>
                                                <option>Bedok</option>
                                                <option>Bishan</option>
                                                <option>Bukit Batok</option>
                                                <option>Bukit Merah</option>
                                                <option>Bukit Panjang</option>
                                                <option>Bukit Timah</option>
                                                <option>Central</option>
                                                <option>Choa Chu Kang</option>
                                                <option>Clementi</option>
                                                <option>Geylang</option>
                                                <option>Hougang</option>
                                                <option>Jurong East</option>
                                                <option>Jurong West</option>
                                                <option>Kallang / Whampoa</option>
                                                <option>Marine Parade</option>
                                                <option>Pasir Ris</option>
                                                <option>Punggol</option>
                                                <option>Queenstown</option>
                                                <option>Sembawang</option>
                                                <option>Sengkang</option>
                                                <option>Serangoon</option>
                                                <option>Tampines</option>
                                                <option>Toa Payoh</option>
                                                <option>Woodlands</option>
                                                <option>Yishun</option>
                                            </select>
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
                                        {
                                            this.state.formMsg !== '' ? (
                                                <div className="form-group">
                                                    <p>{this.state.formMsg}</p>
                                                </div>
                                            ) :
                                                ''
                                        }
                                        <button type="submit" className="btn font-weight-bold" id="submit-btn">Register</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(withCookies(Login))

