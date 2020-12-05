import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ShowAllEvents.scss'

class CreateEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }
    componentDidMount() {
        this.getEvents()
    }
    getEvents() {

        axios.get('http://localhost:5000/api/v1/events')
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
            <div id="show-all-event-page">
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
                                        <div className="event-sections col-4" key={items._id}>
                                            <div className="actual-events">
                                                <figure>
                                                    <div>
                                                        <Link to={{
                                                            pathname: `/events/${items._id}`,
                                                            state: {
                                                                product: items
                                                            }
                                                        }}><p className="host-by">{items.hosted_by} </p>
                                                        </Link>
                                                        <p className="host-date">{items.hosted_date}</p>
                                                        <p className="host-time">{items.hosted_time}</p>
                                                        <p className="location">{items.location}</p>
                                                    </div>
                                                </figure>



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

export default CreateEvents
