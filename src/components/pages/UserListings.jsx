/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React from 'react'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import './UserListings.scss'

class UserListings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listings: [],
            category: '',
            location: '',
            filteredListings: [],
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
                    listings: response.data,
                    filteredListings: response.data
                })
                console.log(this.state.listings)
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleChange(e, elemName) {
        if (e.target.value === '') {
            this.setState({
                filteredListings: this.state.listings,
                [elemName]: e.target.value,
            })
            return
        }
        console.log(this.state.listings[0])
        const results = this.state.listings.filter(item => {
            if (item.location === e.target.value) {
                return true
            }
            else if (item.category === e.target.value) {
                return true
            }
            console.log(this.state)
        })

        this.setState({
            [elemName]: e.target.value,
            filteredListings: results
        })
    }

    render() {
        return (
            <div className="container container-all-listings" >
                {/* <div className="page-heading">
                    <h1>All Listings</h1>
                </div> */}
                < div className="listings" >
                    <div className="row">
                        <div className="col-2 filter-section">
                            <form className="form my-2 my-lg-0">
                                <div className="input-group filter-header">
                                    <h3>Filter by category</h3>
                                    <select className="form-control" value={this.state.category} onChange={e => { this.handleChange(e, 'category') }} id="filter-category">
                                        <option value="">---PLEASE SELECT---</option>
                                        <option>Dairy, Chilled & Eggs</option>
                                        <option>Fruits & Vegetables</option>
                                        <option>Meat & Seafood</option>
                                        <option>Rice & Cooking Essentials</option>
                                        <option>Frozen</option>
                                        <option>Wines, Beers & Spirits</option>
                                        <option>Beverages</option>
                                    </select>
                                </div>
                                <div className="input-group filter-header">
                                    <h3>Filter by location</h3>
                                    <select className="form-control" value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} id="filter-location">
                                        <option>---PLEASE SELECT---</option>
                                        {/* {
                                            this.state.listings.location.length > 1 ? (
                                                this.state.listings.
                                            )
                                        } */}

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
                        <div className="col-10">
                            <div className="row">
                                {
                                    this.state.filteredListings.length > 0 ? (
                                        this.state.filteredListings.map(listing => {
                                            return (

                                                <div className="listing col-3">
                                                    <div className="card" style={{ "width": "18rem" }}>
                                                        <div class="card-header">
                                                            <p className="card-text p-username">{listing.username}</p>
                                                            {/* <p className="card-text p-listing-age">{this.getListingAge(listing.created_at)}</p> */}
                                                        </div>
                                                        <img src={listing.img} className="card-img-top" alt="" />
                                                        <div className="card-body">
                                                            <p className="card-text p-listing_name">{listing.listing_name}</p>
                                                            <Link to={{
                                                                // link to new path
                                                                pathname: `/listings/${listing.slug}`,
                                                                state: {
                                                                    listing: listing
                                                                }
                                                            }}>
                                                            </Link>
                                                        </div>
                                                    </div>
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




                </div>
            </div >
        )
    }

}

export default withCookies(UserListings)
