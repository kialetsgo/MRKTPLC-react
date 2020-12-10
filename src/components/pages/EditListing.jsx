import React from 'react';
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter, Redirect } from 'react-router-dom'
import moment from 'moment'
class EditListing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listing: {},
        }
    }

    isAuthenticated() {
        const token = this.props.cookies.get('token')

        if (!token || token === "undefined" || token === "null") {
            return false
        }

        return true
    }

    componentDidMount() {
        const routeParams = this.props.match.params
        console.log(routeParams)
        // console.log(this.props)

        if (this.props.location.state && this.props.location.state.product) {
            this.setState({
                listing: this.props.location.state.product
            })
            return
        }
        // call getListing with the slug input
        this.autoFillForm(routeParams.slug)
    }

    handleChange(e, elemName) {
        this.setState({
            listing: { ...this.state.listing, [elemName]: e.target.value } //elemName=name
        })
        console.log(this.state.listing)
        console.log(moment(this.state.listing.expiry_date).format("YYYY-MM-DD"))
    }

    autoFillForm(slug) {
        return axios.get(`http://localhost:5000/api/v1/listings/${slug}`)
            .then(response => {
                this.setState({
                    listing: response.data
                })
                console.log(response.data)
                // console.log(this.state.listing)

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        // console.log(token)
        let slug = this.props.match.params.slug
        axios.patch(`http://localhost:5000/api/v1/listings/${slug}`, qs.stringify({
            description: this.state.listing.description,
            img: this.state.listing.img,
            listing_name: this.state.listing.listing_name,
            category: this.state.listing.category,
            location: this.state.listing.location,
            expiry_date: this.state.listing.expiry_date,
        }), config)
            .then(response => {
                console.log(response.data)
                this.props.history.push(`/users/listings`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            this.isAuthenticated() ? (
                <div className="container">
                    <h1 className="mt-5">Edit Listing</h1>
                    <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                        <div className="form-group">
                            <label htmlFor="listing_name">Name of Item</label>
                            <input type="text" value={this.state.listing.listing_name} onChange={e => { this.handleChange(e, 'listing_name') }} className="form-control" id="listing_name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="img">Image URL</label>
                            <input type="text" value={this.state.listing.img} onChange={e => { this.handleChange(e, 'img') }} className="form-control" id="img" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Select Food Category</label>
                            <select className="form-control" value={this.state.listing.category} onChange={e => { this.handleChange(e, 'category') }} id="category">
                                <option>---Please Select---</option>
                                <option>Dairy, Chilled & Eggs</option>
                                <option>Fruits & Vegetables</option>
                                <option>Meat & Seafood</option>
                                <option>Rice & Cooking Essentials</option>
                                <option>Frozen</option>
                                <option>Wines, Beers & Spirits</option>
                                <option>Beverages</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Select Area</label>
                            <select className="form-control" value={this.state.listing.location} onChange={e => { this.handleChange(e, 'location') }} id="location">
                                <option>---Please Select---</option>
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
                        <div className="form-group">
                            <label htmlFor="description">Item Description</label>
                            <textarea className="form-control" value={this.state.listing.description} onChange={e => { this.handleChange(e, 'description') }} id="description" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Select Expiry Date</label>
                            <input type="date" value={moment(this.state.listing.expiry_date).format("YYYY-MM-DD")} onChange={e => { this.handleChange(e, 'expiry_date') }} className="form-control" id="expiry_date" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit Changes</button>
                    </form>
                </div>
            ) : (
                    <Redirect to="/users/login" />
                )
        )
    }
}

export default withRouter(withCookies(EditListing))