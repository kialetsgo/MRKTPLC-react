import React from 'react';
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import './CreateListing.scss'

class CreateListing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            img: '',
            listing_name: '',
            category: '',
            location: '',
            expiry_date: '',
        }
    }

    handleChange(e, elemName) {
        this.setState({ [elemName]: e.target.value })
        console.log(this.state)
    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        console.log(token)
        axios.post('http://localhost:5000/api/v1/users/listings/new', qs.stringify({
            description: this.state.description,
            img: this.state.img,
            listing_name: this.state.listing_name,
            category: this.state.category,
            location: this.state.location,
            expiry_date: this.state.expiry_date,
        }), config)
            .then(response => {
                console.log(response.data)
                this.setState({
                    description: '',
                    img: '',
                    listing_name: '',
                    category: '',
                    location: '',
                    expiry_date: '',
                    redirect: true,
                })
                this.props.history.push('/users/listings')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div id="page-createList">
                <div className="container">
                    <div className="wrapper">

                        <div className="form-input">
                                <div className="row">
                                    <div className="col-md-4 offset-md-4">

                                
                                    <div className="titleDiv">
                                        <p className="title">Create Listing</p>
                                    </div>

                                        <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="listing_name">Name of Item</label>
                                                <input type="text" value={this.state.listing_name} onChange={e => { this.handleChange(e, 'listing_name') }} className="form-control" id="listing_name" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="img">Image URL</label>
                                                <input type="text" value={this.state.img} onChange={e => { this.handleChange(e, 'img') }} className="form-control" id="img" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="category">Select Food Category</label>
                                                <select className="form-control" value={this.state.category} onChange={e => { this.handleChange(e, 'category') }} id="category">
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
                                                <label className="entryTitle" htmlFor="location">Select Area</label>
                                                <select className="form-control" value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} id="location">
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
                                                <label className="entryTitle" htmlFor="description">Item Description</label>
                                                <textarea className="form-control" value={this.state.description} onChange={e => { this.handleChange(e, 'description') }} id="description" rows="3"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="description">Select Expiry Date</label>
                                                <input type="date" value={this.state.expiry_date} onChange={e => { this.handleChange(e, 'expiry_date') }} className="form-control" id="expiry_date" />
                                            </div>
                                            <button type="submit" className="btn font-weight-bold" id="submit-btn">Submit</button>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(withCookies(CreateListing))