import axios from 'axios'
import React from 'react'
import jwt from 'jwt-decode'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import './Listing.scss'

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

    confirmUser() {
        // get token
        const token = this.props.cookies.get('token')
        try {
            const decodedToken = jwt(token)
            console.log(decodedToken)
            if (decodedToken.username === this.state.listing.username) {
                return true
            }
            return false
        } catch (e) {
            return false
        }
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
            <div className="container container-listing shadow p-3 mb-5 bg-white rounded">
                <div className="listing">
                    < div className="row" >
                        <div style={{
                            backgroundImage: `url(${this.state.listing.img})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            maxHeight: "600px",
                        }}
                            className="col-6 fix-img">
                        </div>
                        <div className="col-6 listing-body">
                            <h1 className="listing-username">{this.state.listing.username}</h1>
                            <h1 className="listing-name">{this.state.listing.listing_name}</h1>
                            <hr />
                            <p className="p-location">{this.state.listing.location}</p>
                            {
                                this.confirmUser() ? (
                                    <div className="buttons">
                                        <div className="edit-button">
                                            <button type="button" class="btn btn-primary">Edit Listing</button>
                                            <Link to={{
                                                // link to new path
                                                pathname: `/listings/edit/${this.state.listing.slug}`,
                                                state: {
                                                    listing: this.state.listing.slug
                                                }
                                            }}>
                                            </Link>
                                        </div>
                                        <div className="delete-button">
                                            <button onClick={e => { this.handleDelete(e) }} type="button" class="btn btn-danger">Delete Listing</button>
                                        </div>
                                    </div>

                                ) : ""
                            }
                        </div>
                    </div >
                </div >


            </div >
        )
    }

}

export default withCookies(Listing)
