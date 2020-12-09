/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'tailwindcss/tailwind.css'
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
                document.querySelector('.glider').addEventListener('glider-slide-visible', function (event) {
                    var glider = Glider(this);
                    console.log('Slide Visible %s', event.detail.slide)
                });
                document.querySelector('.glider').addEventListener('glider-slide-hidden', function (event) {
                    console.log('Slide Hidden %s', event.detail.slide)
                });
                document.querySelector('.glider').addEventListener('glider-refresh', function (event) {
                    console.log('Refresh')
                });
                document.querySelector('.glider').addEventListener('glider-loaded', function (event) {
                    console.log('Loaded')
                });

                window._ = new Glider(document.querySelector('.glider'), {
                    slidesToShow: 1, //'auto',
                    slidesToScroll: 1,
                    itemWidth: 150,
                    draggable: true,
                    scrollLock: false,
                    dots: '#dots',
                    rewind: true,
                    arrows: {
                        prev: '.glider-prev',
                        next: '.glider-next'
                    },
                    responsive: [
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToScroll: 'auto',
                                itemWidth: 400,
                                slidesToShow: 'auto',
                                exactWidth: true
                            }
                        },
                        {
                            breakpoint: 700,
                            settings: {
                                slidesToScroll: 4,
                                slidesToShow: 4,
                                dots: false,
                                arrows: false,
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToScroll: 3,
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToScroll: 2,
                                slidesToShow: 2,
                                dots: false,
                                arrows: false,
                                scrollLock: true
                            }
                        }
                    ]
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div id="show-all-event-page" className='background_image' style={{ backgroundImage: "url(/img/drink1.jpg)" }}>
                <h1 className="page-header col-12 bg-gray-100 dark:bg-gray-800 event-sections text-3xl font-semibold">Featured on-going events from All Users</h1>
                
                <div className="entire-container glider-contain">

                    <div className="glider">

                        {
                            this.state.events.length > 0 ? (
                                this.state.events.map(items => {
                                    return (
                                        <div className="event-sections col-4 max-w-md py-4 px-8 bg-white shadow-lg rounded-lg" key={items._id}>
                                            <div>
                                                <h2 class="text-gray-800 text-2xl font-semibold">Location : {items.location}</h2>
                                                <p class="mt-2 text-gray-600">{items.description}</p>
                                            </div>
                                            <div class="flex justify-end mt-4">
                                                <Link to={{
                                                    pathname: `/events/${items._id}`,
                                                    state: {
                                                        product: items
                                                    }
                                                }}><p className="host-by text-1xl font-medium text-indigo-500" >Click to know more</p>
                                                </Link>
                                            </div>
                                            <div>
                                                <p className="host-date">Date: {moment(items.hosted_date).format("YYYY-MM-DD")}</p>
                                                <p className="host-time">Time: {items.hosted_time}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                    <p className="content-center bg-gray-100 dark:bg-gray-800 event-sections col-9 lg:flex shadow rounded-lg border  border-gray-400 text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">no events hosted yet</p>
                                )

                        }

                    </div>
                    <button className="glider-prev arrow">&laquo;</button>
                    <button className="glider-next arrow">&raquo;</button>
                    <div id="dots"></div>
                </div>
            </div>
        )
    }
}

export default CreateEvents

