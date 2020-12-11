/* eslint-disable array-callback-return */
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
            events: [],
            location: '',
            filteredEvents: [],
        }
    }
    componentDidMount() {
        this.getEvents()





    }
    getEvents() {

        axios.get('https://app-mrktplc-server.herokuapp.com/api/v1/events')
            .then(response => {
                this.setState({
                    events: response.data,
                    filteredEvents: response.data,
                })
                console.log(response.data)
                document.querySelector('.glider').addEventListener('glider-slide-visible', function (event) {
                    var glider = Glider(this);

                });
                document.querySelector('.glider').addEventListener('glider-slide-hidden', function (event) {

                });
                document.querySelector('.glider').addEventListener('glider-refresh', function (event) {

                });
                document.querySelector('.glider').addEventListener('glider-loaded', function (event) {

                });

                window._ = new Glider(document.querySelector('.glider'), {
                    slidesToShow: 1,
                    dots: '#dots',
                    draggable: true,
                    arrows: {
                        prev: '.glider-prev',
                        next: '.glider-next'
                    }
                    ,
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

    handleChange(e, elemName) {
        if (e.target.value === '') {
            this.setState({
                filteredEvents: this.state.events,
                [elemName]: e.target.value,
            })
            return
        }
        console.log(this.state.events[0])
        const results = this.state.events.filter(item => {
            if (item.location === e.target.value) {
                return true
            }
            console.log(this.state)
        })

        this.setState({
            [elemName]: e.target.value,
            filteredEvents: results
        })
    }

    render() {
        return (
            <div id="show-all-event-page" className='background_image' style={{ backgroundImage: "url(/img/drink1.jpg)" }}>
                <div className="entire-container glider-contain">


                    <div className="glider">

                        {
                            this.state.events.length > 0 ? (
                                this.state.events.map(items => {
                                    return (
                                        <div className="event-sections col-3 max-w-md py-4 px-8 bg-yellow-100 shadow-lg rounded-lg" key={items._id}>
                                            <div className="bg-gray-200 rounded-lg pl-2 pt-2 pb-2">
                                                <h2 className="text-gray-800 bg-text-2xl font-semibold">Location : {items.location}</h2>
                                                <p className="mt-2 text-gray-600">{items.description}</p>
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                <Link to={{
                                                    pathname: `/events/${items._id}`,
                                                    state: {
                                                        product: items
                                                    }
                                                }}><p className="host-by text-1xl font-medium text-indigo-500" >Click to know more</p>
                                                </Link>
                                            </div>
                                            <div className="bg-gray-200 rounded-lg pl-2 pt-2 pb-2">
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

                <div className="container container-all-events" >
                    < div className="events" >
                        <div className="row">
                            <div className="col-2 filter-section">
                                <form className="form">
                                    <div className="input-group filter-header">
                                        <h3>Filter By Location</h3>
                                        <select className="form-control inline-block" value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} id="filter-location">
                                            <option value="">---PLEASE SELECT---</option>
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
                                </form>
                            </div>
                            <div className="col-10 shadow  rounded">
                                <div className="row">
                                    {
                                        this.state.filteredEvents.length > 0 ? (
                                            this.state.filteredEvents.map(item => {
                                                return (
                                                    <div className="event col-4" key={item._id}>
                                                        <div className="card" style={{ "width": "18rem" }}>
                                                            <div className="card-header">
                                                                <p className="card-text p-username">{item.location}</p>
                                                                {/* <p className="card-text p-listing-age">{this.getListingAge(listing.created_at)}</p> */}
                                                            </div>
                                                            <div className="card-body">
                                                                <p className="card-text p-listing_name">{item.hosted_by}</p>
                                                                <p className="host-date">Date: {moment(item.hosted_date).format("YYYY-MM-DD")}</p>
                                                                <p className="host-time">Time: {item.hosted_time}</p>
                                                                <Link to={{
                                                                    // link to new path
                                                                    pathname: `/events/${item._id}`,
                                                                    state: {
                                                                        product: item
                                                                    }
                                                                }}><p className="host-by text-1xl font-medium text-indigo-500" >Click to know more</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        ) : (
                                                <p>No Events at this moment</p>
                                            )
                                    }
                                </div>
                            </div>

                        </div>




                    </div>
                </div >
            </div>
        )
    }
}

export default CreateEvents

