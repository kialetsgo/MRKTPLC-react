import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import './AllListings.scss'

class AllListings extends React.Component {
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
        return axios.get('http://localhost:5000/api/v1/listings/all')
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
                                        <div className="listing col-4">
                                            <figure>
                                                <img src={listing.img} />
                                                <figcaption>
                                                    <p className="p-name">{listing.listing_name}</p>
                                                    <p className="p-location">{listing.location}</p>
                                                    <p className="p-username">{listing.username}</p>
                                                </figcaption>
                                                <Link to={{
                                                    // link to new path
                                                    pathname: `/listings/${listing.slug}`,
                                                    state: {
                                                        listing: listing
                                                    }
                                                }}>
                                                </Link>
                                            </figure>
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

export default AllListings
