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
        return axios.get(`http://localhost:5000/api/v1/listings/${slug}`)
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

    handleDelete(e) {
        e.preventDefault()
        console.log('click')
        const slug = this.props.match.params.slug
        console.log(slug)
        axios.delete(`http://localhost:5000/api/v1/listings/${slug}`)
            .then(response => {
                console.log(response.data)
                this.props.history.push('/users/listings')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="page-heading">
                    <h1>
                        Listing Name: {this.state.listing.listing_name}
                    </h1>
                </div>
                <div className="listing">
                    <figure>
                        <img src={this.state.listing.img} />
                        <figcaption>
                            <p className="p-name">{this.state.listing.name}</p>
                            <p className="p-location">{this.state.listing.location}</p>
                        </figcaption>
                    </figure>
                </div>

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

        )
    }

}

export default withCookies(Listing)
