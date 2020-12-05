import React, { Component } from 'react'
import axios from 'axios'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import jwt from 'jwt-decode'
import moment from 'moment'
import './ShowOneEvents.scss'
class ShowOneEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event: []
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
                console.log(response.data)
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
                                        <hr />
                                    </div>
                                    <article>
                                        <p>{this.state.event.description}</p>
                                        {
                                            this.confirmUser() ? (
                                            <button onClick={e => { this.handleDelete(e) }} type="button" class="btn btn-primary">Delete Event</button> ) :""
                                        }
                                    </article>




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