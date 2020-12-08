import axios from 'axios'
import React from 'react'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import './UserListings.scss'

class UserListings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listings: []
        }
    }

    componentDidMount() {
        this.getAllListings()
    }

    getAllListings() {
        const token = this.props.cookies.get('token')
        console.log(token)
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios.get('http://localhost:5000/api/v1/users/listings', config)
            .then(response => {
                this.setState({
                    listings: response.data
                })
                console.log(this.state.listings)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="page-heading">
                    <h1>All Listings</h1>
                </div>
                <div className="listings">
                    <div className="row">
                        {
                            this.state.listings.length > 0 ? (
                                this.state.listings.map(listing => {
                                    return (
                                        // <div className="listing col-4">
                                        //     <figure>
                                        //         <img src={listing.img} />
                                        //         <figcaption>
                                        //             <p className="p-name">{listing.listing_name}</p>
                                        //             <p className="p-location">{listing.location}</p>
                                        //             <p className="p-username">{listing.username}</p>
                                        //         </figcaption>
                                        //     </figure>
                                        <div className="listings-container">

                                            <div>
                                                <div class="h-screen w-full flex bg-gray-800">
                                                    <nav class="w-24 flex flex-col items-center bg-gray-900 py-4">
                                                        <div class="text-lg font-semibold text-white">Le Festin</div>
                                                        {/* <!-- nav content --> */}
                                                        <ul class="mt-2 text-gray-300 font-semibold">
                                                            <li class="mt-3 t">
                                                                <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                                                    <path
                                                                        d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
                    17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
                    8h-8v10h8V11m-10 4H3v6h8v-6z"
                                                                    ></path>
                                                                </svg>
                                                                <span>pizza</span>
                                                            </li>
                                                            <li class="mt-3 t">
                                                                <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                                                                    <path
                                                                        d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
                    17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
                    8h-8v10h8V11m-10 4H3v6h8v-6z"
                                                                    ></path>
                                                                </svg>
                                                                <span>Drink</span>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                    {/* <!-- main --> */}
                                                    <main class="w-full overflow-y-auto">
                                                        <div class="px-10 mt-5">
                                                            <span class="uppercase font-bold text-2xl text-white"
                                                            >special food</span
                                                            >
                                                        </div>
                                                        <div class="px-10 grid grid-cols-4 gap-4">
                                                            <div
                                                                class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                                                            >
                                                                <div class="bg-white rounded-lg mt-5">
                                                                    <img
                                                                        src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
                                                                        class="h-40 rounded-md"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                                                                    <div class="py-5 px-5">
                                                                        <span class="font-bold text-gray-800 text-lg">Geek Pizza</span>
                                                                        <div class="flex items-center justify-between">
                                                                            <div class="text-sm text-gray-600 font-light">
                                                                                Size : Regular
                  </div>
                                                                            <div class="text-2xl text-red-600 font-bold">
                                                                                $ 8.00
                  </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end cols --> */}

                                                            <div
                                                                class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                                                            >
                                                                <div class="bg-white rounded-lg mt-5">
                                                                    <img
                                                                        src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
                                                                        class="h-40 rounded-md"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                                                                    <div class="py-5 px-5">
                                                                        <span class="font-bold text-gray-800 text-lg">Geek Pizza</span>
                                                                        <div class="flex items-center justify-between">
                                                                            <div class="text-sm text-gray-600 font-light">
                                                                                Size : Regular
                  </div>
                                                                            <div class="text-2xl text-red-600 font-bold">
                                                                                $ 8.00
                  </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end cols --> */}

                                                            <div
                                                                class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                                                            >
                                                                <div class="bg-white rounded-lg mt-5">
                                                                    <img
                                                                        src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
                                                                        class="h-40 rounded-md"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                                                                    <div class="py-5 px-5">
                                                                        <span class="font-bold text-gray-800 text-lg">Geek Pizza</span>
                                                                        <div class="flex items-center justify-between">
                                                                            <div class="text-sm text-gray-600 font-light">
                                                                                Size : Regular
                  </div>
                                                                            <div class="text-2xl text-red-600 font-bold">
                                                                                $ 8.00
                  </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end cols --> */}

                                                            <div
                                                                class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                                                            >
                                                                <div class="bg-white rounded-lg mt-5">
                                                                    <img
                                                                        src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
                                                                        class="h-40 rounded-md"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                                                                    <div class="py-5 px-5">
                                                                        <span class="font-bold text-gray-800 text-lg">Geek Pizza</span>
                                                                        <div class="flex items-center justify-between">
                                                                            <div class="text-sm text-gray-600 font-light">
                                                                                Size : Regular
                  </div>
                                                                            <div class="text-2xl text-red-600 font-bold">
                                                                                $ 8.00
                  </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end cols --> */}

                                                            <div
                                                                class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
                                                            >
                                                                <div class="bg-white rounded-lg mt-5">
                                                                    <img
                                                                        src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
                                                                        class="h-40 rounded-md"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                                                                    <div class="py-5 px-5">
                                                                        <span class="font-bold text-gray-800 text-lg">Geek Pizza</span>
                                                                        <div class="flex items-center justify-between">
                                                                            <div class="text-sm text-gray-600 font-light">
                                                                                Size : Regular
                  </div>
                                                                            <div class="text-2xl text-red-600 font-bold">
                                                                                $ 8.00
                  </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end cols --> */}
                                                        </div>
                                                    </main>
                                                </div>
                                            </div>
                                            <Link to={{
                                                // link to new path
                                                pathname: `/listings/${listing.slug}`,
                                                state: {
                                                    listing: listing
                                                }
                                            }}>
                                            </Link>
                                        </div>
                                    )
                                })
                            ) : (
                                    <p>No listings at this moment</p>
                                )
                        }

                    </div>
                </div>
            </div>
        )
    }

}

export default withCookies(UserListings)
