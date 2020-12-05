/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { Component } from 'react'
import qs from 'qs'
import './Contact.scss'

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            message: '',
            formMsg: []
        }
    }

    handleInputChange(e) {
        const state = {}
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    handleFormSubmit(e) {
        e.preventDefault()

        this.setState({
            formMsg: []
        })

        const formValid = this.validateFormInputs()

        if (formValid) {

            console.log(this.state)
            axios.post('http://localhost:5000/api/v1/send-message',qs.stringify({
                name:this.state.name,
                email:this.state.email,
                message:this.state.message,
            }))
                .then(response => {
                    this.setState({
                        name: '',
                        email: '',
                        message: '',
                    })
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    validateFormInputs() {
        const err = []

        if (this.state.name === "") {
            err.push('Name must not be empty')
        }
        if (this.state.email === "") {
            err.push('Email must not be empty')
        }
        if (this.state.message === "") {
            err.push('Message must not be empty')
        }

        if (err.length === 0) {
            return true
        }

        this.setState({
            formMsg: err
        })

        return false
    }


    render() {
        return (
            <div id="page-contact">
                <div className="container-fluid">
                    <h1>Want to know more? Contact us now.</h1>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <section className="col-content">
                                <form onSubmit={e => { this.handleFormSubmit(e) }}>
                                    {
                                        this.state.formMsg.length > 0 ?
                                        (
                                            <ul className="form-messages text-left">
                                                {
                                                    this.state.formMsg.map(msg => {
                                                        return (
                                                            <li>{msg}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        ) :
                                        ''
                                    }
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control form-control-lg" id="name" name="name" value={this.state.name} onChange={e => {this.handleInputChange(e)}} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control form-control-lg" id="email" name="email" value={this.state.email} onChange={e => {this.handleInputChange(e)}} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea className="form-control form-control-lg" id="message" name="message" value={this.state.message} onChange={e => {this.handleInputChange(e)}}></textarea>
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-light">Send</button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Contact