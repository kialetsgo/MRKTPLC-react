import React, { Component } from 'react'
import axios from 'axios'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import jwt from 'jwt-decode'
import moment from 'moment'
import qs from 'qs'
import './ShowOneEvents.scss'
class ShowOneEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event: {},

        }
    }

    componentDidMount() {

        const routeParams = this.props.match.params
        console.log(routeParams)

        if (this.props.location.state && this.props.location.state.event) {
            this.setState({
                event: this.props.location.state.event
            })
            return
        }

        this.getSingleEvent(routeParams.id)
        this.confirmUser()

    }

    getSingleEvent(id) {
        console.log(id)
        axios.get(`http://localhost:5000/api/v1/events/${id}`)
            .then(response => {
                this.setState({
                    event: response.data
                })
                console.log(this.state.event.people_joining)
            })
            .catch(err => {
                console.log(err)
            })
    }

    confirmUser() {
        // get token
        const token = this.props.cookies.get('token')
        console.log(this.state)
        try {
            const decodedToken = jwt(token)
            console.log(decodedToken)
            if (decodedToken.username === this.state.event.hosted_by) {
                return true
            }
            return false
        } catch (e) {
            return false
        }
    }


    handleDelete(e) {
        console.log('click')
        e.preventDefault()
        const routeParams = this.props.match.params
        const id = routeParams.id


        axios.delete(`http://localhost:5000/api/v1/events/${id}`)
            .then(response => {
                console.log(response.data)
                this.props.history.push('/events')

            })
            .catch(err => {
                console.log(err)
            })


    }


    RSVP(e) {


        e.preventDefault()
        const token = this.props.cookies.get("token")
        const decodedToken = jwt(token)
        const routeParams = this.props.match.params
        const id = routeParams.id

        let currentUserList = this.state.event.people_joining
        if (currentUserList.includes(decodedToken.username) === false) {

            this.setState({
                event: { ...this.state.event, people_joining: decodedToken.username }
            })
            console.log(this.state.event)
            const config = {
                headers: {
                    'Authorization': token
                }
            }

            axios.patch(`http://localhost:5000/api/v1/events/${id}`, qs.stringify({

                people_joining: decodedToken.username
            }), config)
                .then(response => {
                    console.log(this.state)
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log('nope')
            let array = this.state.event.people_joining
            console.log(Array.isArray(array))
            console.log(this.state.event.people_joining.length)
        }
    }
    render() {
        return (
            <div id="show-single-event">
                <div className="container">
                    {
                        this.state.event ? (
                            <div className="product row">
                                <div className="col-7">
                                    <div className="page-heading">
                                        <h1>Event Details</h1>
                                        <p>{moment(this.state.hosted_date).format("YYYY-MM-DD")} at {this.state.event.hosted_time}</p>
                                        <p>Contact us at {this.state.event.contact_number}</p>

                                        <p>{this.state.event.people_joining}</p>
                                

                                        <hr />
                                    </div>
                                    <article>
                                        <p>{this.state.event.description}</p>
                                        {
                                            this.confirmUser() ? (
                                                <button onClick={e => { this.handleDelete(e) }} type="button" class="btn btn-primary">Delete Event</button>) : ""
                                        }
                                    </article>

                                    <button onClick={e => { this.RSVP(e) }} type="button" class="btn btn-primary">Join Event</button>




                                </div>
                            </div>
                        ) : ''
                    }

                </div>
            </div>
        )
    }
}


export default withRouter(withCookies(ShowOneEvents))