/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import Ajv from 'ajv'
import EventValidationSchema from '../../validation-schemas/createEvent'
import moment from 'moment'
import './CreateEvents.scss'

const ajv = new Ajv()
class CreateEvents extends Component {


    constructor(props) {
        super(props)
        this.state = {
            hosted_date: '',
            hosted_time: '',
            location: '',
            description: '',
            listed_product: '',
            contact_number: '',
            formMsg: [],
        }
    }

    handleChange(e, elemName) {
        switch (elemName) {
            case 'hosted_by':
                this.setState({
                    hosted_by: e.target.value
                })
                break;
            case 'hosted_date':
                this.setState({
                    hosted_date: e.target.value
                })
                break;
            case 'hosted_time':
                this.setState({
                    hosted_time: e.target.value
                })
                break;
            case 'location':
                this.setState({
                    location: e.target.value
                })
                break;
            case 'description':
                this.setState({
                    description: e.target.value
                })
                break;
            case 'listed_product':
                this.setState({
                    listed_product: e.target.value
                })
                break;
            case 'contact_number':
                this.setState({
                    contact_number: e.target.value
                })
                break;
            default:
        }
    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page
        
        this.setState({
            formMsg: []
        })

        // validate form
        const formValid = this.validateFormInputs()

        if (formValid) {

            const token = this.props.cookies.get('token')
            const config = {
                headers: {
                    auth_token: token
                }
            }


            axios.post('https://app-mrktplc-server.herokuapp.com/api/v1/events/new', qs.stringify({
                hosted_date: this.state.hosted_date,
                hosted_time: this.state.hosted_time,
                location: this.state.location,
                description: this.state.description,
                listed_product: this.state.listed_product,
                contact_number: this.state.contact_number,
            }), config)
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        hosted_date: '',
                        hosted_time: '',
                        location: '',
                        description: '',
                        listed_product: '',
                        contact_number: '',
                    })
                    this.props.history.push('/users/events')
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    validateFormInputs() {
        const err = []
        console.log(this.state)

        const formValid = ajv.validate(EventValidationSchema, this.state)
        console.log(formValid)

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
            formMsg: err
        })

        return false
    }
    render() {
        return (


            <div id="create-event-page" className="flex items-top justify-center bg-white dark:bg-gray-900 sm:items-center sm:pt-0">


                <div className="grid grid-cols-1 md:grid-cols-2 form-container">

                    <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg justify-center hidden lg:block">
                        <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                            Start planning now!
                        </h1>
                        <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                            Fill in the form to share food!
                        </p>
                        

                        <img src="../../img/foodpic1.jpg" width="600" alt="food pic" />

                    </div>
            
                    <div className="actual-form p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg justify-center">
                        <h3 className="text-2xl text-gray-900 font-semibold">Time, Date, Location!</h3>
                        <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                            {
                                this.state.formMsg.length > 0 ?
                                    (
                                        <ul className="form-group">
                                            {
                                                this.state.formMsg.map(msg => {
                                                    return (
                                                        <p>{msg}</p>
                                                    )
                                                })
                                            }
                                        </ul>
                                    ) :
                                    ''
                            }
                            <div className="form-group">
                                <label htmlFor="location" className="block text-xs font-semibold text-gray-600 uppercase">Location</label>
                                <select value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} className="form-control" id="location">
                                    <option>---Please Select---</option>
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

                            <div className="flex justify-between gap-3">
                                <span className="w-1/2">
                                    <div className="form-group">
                                        <label htmlFor="hosted_date" className="block text-xs font-semibold text-gray-600 uppercase">Date</label>
                                        <input type="date" value={moment(this.state.hosted_date).format("YYYY-MM-DD")} onChange={e => { this.handleChange(e, 'hosted_date') }} className="form-control" id="hosted_date" />
                                    </div>
                                </span>
                                <span className="w-1/2">
                                    <div className="form-group">
                                        <label htmlFor="hosted_time" className="block text-xs font-semibold text-gray-600 uppercase">Time</label>
                                        <input type="time" value={this.state.hosted_time} onChange={e => { this.handleChange(e, 'hosted_time') }} className="form-control" id="hosted_time" />
                                    </div>
                                </span>
                            </div>



                            <div className="form-group">
                                <label htmlFor="contact_number" className="block text-xs font-semibold text-gray-600 uppercase">Contact</label>
                                <input type="number" value={this.state.contact_number} onChange={e => { this.handleChange(e, 'contact_number') }} className="form-control" id="contact_number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="block text-xs font-semibold text-gray-600 uppercase">Description</label>
                                <textarea type="string" value={this.state.description} onChange={e => { this.handleChange(e, 'description') }} className="form-control" id="description"></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">Host</button>

                        </form>
                    </div>
               
                </div>

            </div >



        )
    }
}

export default withRouter(withCookies(CreateEvents))
