/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import './ShowUserEvents.scss'

class ShowUserEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        this.getUsersEvents()
    }
    getUsersEvents() {

        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                'Authorization': token
            }
        }
        console.log(token)

        axios.get('http://localhost:5000/api/v1/users/events', config)
            .then(response => {
                this.setState({
                    events: response.data
                })
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div id="show-all-user-event-page">
                <div className="container">
                    <div className="page-heading">
                        <h1>Current active events</h1>
                        <hr />
                    </div>
                    <div className="events-listing">
                        {
                            this.state.events.length > 0 ? (
                                this.state.events.map(items => {
                                    return (
                                        <div className="event-sections col-9 lg:flex shadow rounded-lg border  border-gray-400" key={items._id}>
                                            <div className="bg-blue-600 rounded-lg lg:w-2/12 py-4 block h-full shadow-inner">
                                                <div className="text-center tracking-wide">
                                                    <div className="text-white font-bold text-4xl ">{moment(items.hosted_date).format("DD")}</div>
                                                    <div className="text-white font-normal text-2xl">{moment(items.hosted_date).format("MMM")}</div>
                                                </div>
                                            </div>
                                            <div className="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
                                                <div className="flex flex-row lg:justify-start justify-center">
                                                    <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                                                        <i className="far fa-clock"></i> Time : {items.hosted_time}
                                                    </div>
                                                    <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                                                        Organiser : {items.hosted_by}
                                                    </div>
                                                </div>
                                                <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">{items.location}</div>

                                                <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                                                    {items.description}
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center w-full lg:w-1/3 bg-white lg:justify-end justify-center px-2 py-4 lg:px-0">
                                                <Link to={{
                                                    pathname: `/events/${items._id}`,
                                                    state: {
                                                        product: items
                                                    }
                                                }}><span className="tracking-wider text-gray-600 bg-gray-200 px-2 text-sm rounded leading-loose mx-2 font-semibold">
                                                        More detailed
                                                    </span></Link>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                    <p>no events hosted yet</p>
                                )

                        }

                    </div>
                </div>

            </div>
        )
    }
}


export default withRouter(withCookies(ShowUserEvents))
