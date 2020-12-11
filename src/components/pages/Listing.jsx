import axios from 'axios'
import React from 'react'
import jwt from 'jwt-decode'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import './Listing.scss'
import moment from 'moment'
class Listing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listing: ''
        }
    }

    componentDidMount() {
        const routeParams = this.props.match.params
        console.log(routeParams)
        console.log(this.props)

        if (this.props.location.state && this.props.location.state.product) {
            this.setState({
                listing: this.props.location.state.product
            })
            return
        }
        // call getListing with the slug input
        this.getListing(routeParams.slug)
        this.confirmUser()
    }

    getListing(slug) {
        return axios.get(`https://app-mrktplc-server.herokuapp.com/api/v1/listings/${slug}`)
            .then(response => {
                console.log(response)
                this.setState({
                    listing: response.data
                })
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            })
    }

    confirmUser() {
        // get token
        const token = this.props.cookies.get("token");
        try {
            const decodedToken = jwt(token);
            if (decodedToken.username === this.state.listing.username) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    handleDelete(e) {
        e.preventDefault()
        console.log('click')
        const slug = this.props.match.params.slug
        console.log(slug)
        const token = this.props.cookies.get("token");
        const config = {
            headers: {
                auth_token: token,
            },
        };
        axios.delete(`http://localhost:5000/api/v1/listings/${slug}`, config)
            .then(response => {
                console.log(response.data)
                this.props.history.push('/listings/all')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div id="single-listing-style" className="flex items-top justify-center bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 form-container">
                    <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg justify-center hidden lg:block">
                        <div className="listing-img">
                            <img src={this.state.listing.img} width="600" alt="listing" />
                        </div>
                    </div>
                    <div className="actual-form p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg justify-center">
                        <div className="listing-owner">
                            <label htmlFor="listing_owner" className="listing-owner-heading block text-xs font-semibold text-gray-600 uppercase">Listing Owner</label>
                            <h3 className="listing-owner text-2xl text-gray-900 font-semibold">{this.state.listing.username}</h3>
                        </div>
                        <div className="listing-name">
                            <label htmlFor="listing_name" className="listing-name-heading block text-xs font-semibold text-gray-600 uppercase">Listing Name</label>
                            <h1 className="text-4xl sm:text-3xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                                {this.state.listing.listing_name}
                            </h1>
                        </div>
                        <div className="listing-category">
                            <label htmlFor="listing_name" className="listing-category-heading block text-xs font-semibold text-gray-600 uppercase">Category</label>
                            <p className="listing-category text-normal text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                                Category: {this.state.listing.category}
                            </p>
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="contact_number" className="block text-xs font-semibold text-gray-600 uppercase">Contact</label>
                            <input type="number" value={this.state.contact_number} onChange={e => { this.handleChange(e, 'contact_number') }} className="form-control" id="contact_number" />
                        </div> */}
                        <div className="listing-description">
                            <label htmlFor="description" className="listing-description-heading block text-xs font-semibold text-gray-600 uppercase">Description</label>
                            <p className="listing-description">{this.state.listing.description}</p>
                        </div>
                        <div className="listing-expiry">
                            <label htmlFor="location" className="listing-expiry-heading block text-xs font-semibold text-gray-600 uppercase">Expiry Date</label>
                            <p className="listing-expiry">{moment(this.state.listing.expiry_date).format('DD MMM YYYY')}</p>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="description" className="block text-xs font-semibold text-gray-600 uppercase">Description</label>
                            <textarea type="string" value={this.state.description} onChange={e => { this.handleChange(e, 'description') }} className="form-control" id="description"></textarea>
                        </div>
                        <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">Host</button> */}
                    </div>

                </div>

            </div >
            // <div className="container container-listing shadow p-3 mb-5 bg-white rounded">
            //     <div className="listing">
            //         < div className="row" >
            //             <div style={{
            //                 backgroundImage: `url(${this.state.listing.img})`,
            //                 backgroundRepeat: "no-repeat",
            //                 backgroundSize: "contain",
            //                 height: "600px",
            //                 width: "auto",
            //             }}
            //                 className="col-5 fix-img">
            //             </div>
            //             <div className="col-7 listing-body">
            //                 <div className="listing-username">
            //                     <h1>{this.state.listing.username}</h1>
            //                 </div>
            //                 <div className="listing-name">
            //                     <h1>{this.state.listing.listing_name}</h1>
            //                 </div>
            //                 <div className="listing-description">
            //                     <p>Listing Description:<br /> <span>{this.state.listing.description}</span></p>
            //                 </div>
            //                 <hr />
            //                 <p className="p-location">{this.state.listing.location}</p>
            //                 {
            //                     this.confirmUser() ? (
            //                         <div className="buttons">
            //                             <div className="edit-button">
            //                                 <button type="button" class="btn btn-primary">Edit Listing</button>
            //                                 <Link to={{
            //                                     // link to new path
            //                                     pathname: `/listings/edit/${this.state.listing.slug}`,
            //                                     state: {
            //                                         listing: this.state.listing.slug
            //                                     }
            //                                 }}>
            //                                 </Link>
            //                             </div>
            //                             <div className="delete-button">
            //                                 <button onClick={e => { this.handleDelete(e) }} type="button" class="btn btn-danger">Delete Listing</button>
            //                             </div>
            //                         </div>

            //                     ) : ""
            //                 }
            //             </div>
            //         </div >
            //     </div >
            // </div >
        )
    }

}

export default withCookies(Listing)
