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
            axios.post('http://localhost:5000/api/v1/send-message', qs.stringify({
                name: this.state.name,
                email: this.state.email,
                message: this.state.message,
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

            <div id="page-contact" className="flex items-top justify-center bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 form-container">
                    <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                        <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                            Get in touch
                        </h1>
                        <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                            Fill in the form with your question
                        </p>

                        <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                79 Anson Road, Singapore,
                                #20-01
                            </div>
                        </div>

                        <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                +64 1234567890
                            </div>
                        </div>

                        <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                test@test.com
                            </div>
                        </div>
                    </div>
                    <form onSubmit={e => { this.handleFormSubmit(e) }} className="p-6 flex flex-col justify-center">
                        <h3 className="text-2xl text-gray-900 font-semibold">Want to know more? Leave your query below!</h3>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control form-control-lg" id="name" name="name" value={this.state.name} onChange={e => { this.handleInputChange(e) }} placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control form-control-lg" id="email" name="email" value={this.state.email} onChange={e => { this.handleInputChange(e) }} placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control form-control-lg" id="message" name="message" value={this.state.message} onChange={e => { this.handleInputChange(e) }} placeholder="What do you wish to know?"></textarea>
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">Submit</button>
                        </div>
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
                    </form>
                </div>

            </div>
        )
    }
}

export default Contact