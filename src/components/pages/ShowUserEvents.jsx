/* eslint-disable no-undef */
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
                auth_token: token
            }
        }
        console.log(token)

        axios.get('https://app-mrktplc-server.herokuapp.com/api/v1/users/events', config)
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
                    slidesToShow: 1,
                    dots: '#dots',
                    draggable: true,
                    scrollLock: true,
                    arrows: {
                        prev: '.glider-prev',
                        next: '.glider-next'
                    },
                    responsive: [
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToScroll: 'auto',
                                itemWidth: 500,
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
            <div id="show-all-user-event-page" className='background_image' style={{ backgroundImage: "url(/img/partypic1.jpg)" }}>
                <div className="entire-container glider-contain">

                        <div className="content-center col-12 bg-gray-100 dark:bg-gray-800 event-sections text-3xl font-semibold">Current User Active Events</div>

                    <div className="glider">


                        {
                            this.state.events.length > 0 ? (
                                this.state.events.map(items => {
                                    return (
                                        <div className="content-center bg-gray-100 dark:bg-gray-800 event-sections col-6 lg:flex shadow rounded-lg border  border-gray-400" key={items._id}>

                                            <div className="bg-gray-400 dark:bg-gray-800 rounded-lg lg:w-2/12 py-5 block h-full shadow-inner">
                                                <div className="text-center tracking-wide">
                                                    <div className="font-bold text-4xl ">{moment(items.hosted_date).format("DD")}</div>
                                                    <div className="font-normal text-2xl">{moment(items.hosted_date).format("MMM")}</div>
                                                </div>
                                            </div>

                                            <div className="w-full lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
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
                                                        More details
                                                    </span></Link>
                                            </div>
                                            <div className="no_of_participants text-gray-600 bg-gray-200 px-2 text-sm rounded leading-loose mx-2 font-semibold">
                                                No of Participants :      <div className="font-normal text-2xl">{items.people_joining.length}</div>
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


export default withRouter(withCookies(ShowUserEvents))
