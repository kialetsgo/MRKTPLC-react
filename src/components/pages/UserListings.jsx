/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React from 'react'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import './UserListings.scss'
import moment from 'moment'

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
        return axios.get('https://app-mrktplc-server.herokuapp.com/api/v1/users/listings', config)
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
                < div className="listings" >
                    <div className="row">
                        <div className="col-6 filter-section">
                            <div className="input-group filter-header">
                                <h3>Filter by Category</h3>
                                <select className="form-control" value={this.state.category} onChange={e => { this.handleChange(e, 'category') }} id="filter-category">
                                    <option value="">---Please Select---</option>
                                    <option>Dairy, Chilled & Eggs</option>
                                    <option>Fruits & Vegetables</option>
                                    <option>Meat & Seafood</option>
                                    <option>Rice & Cooking Essentials</option>
                                    <option>Frozen</option>
                                    <option>Wines, Beers & Spirits</option>
                                    <option>Beverages</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6 filter-section">
                            <div className="input-group filter-header">
                                <h3>Filter by Location</h3>
                                <select className="form-control" value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} id="filter-location">
                                    <option value="">---Please Select---</option>
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
                        </div>
                    </div>
                </div>
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <div className="row">
                        {
                            this.state.filteredListings.length > 0 ? (
                                this.state.filteredListings.map(listing => {
                                    return (
                                        <div className="listing col-4">
                                            <div className="card" style={{ "width": "18rem" }}>
                                                <div className="card-header">
                                                    <p className="card-text p-username">{listing.username}</p>
                                                </div>
                                                <div className="card-img">
                                                    <img src={listing.img} className="card-img-top" alt="" />
                                                </div>
                                                <hr />
                                                <div className="card-body">
                                                    <p className="card-text p-listing_name">{listing.listing_name}</p>
                                                </div>
                                                <div className="card-expiry">
                                                    <p className="card-expiry p-listing-expiry">{moment(listing.expiry_date).format('DD MMM YYYY')}</p>
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
                                    <p>No listing at this moment</p>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default withCookies(UserListings)
