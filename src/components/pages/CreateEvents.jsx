import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import './CreateEvents.scss'

class CreateEvents extends Component {


    constructor(props) {
        super(props)
        this.state = {
            hosted_date: '',
            hosted_time: '',
            location: '',
            description: '',
            listed_product: '',
        }
    }

    handleChange(e, elemName) {
        switch (elemName) {
            case 'hosted_by':
                this.setState({
                    hosted_by: e.target.value
                })
                break;
            case 'hosted_date':
                this.setState({
                    hosted_date: e.target.value
                })
                break;
            case 'hosted_time':
                this.setState({
                    hosted_time: e.target.value
                })
                break;
            case 'location':
                this.setState({
                    location: e.target.value
                })
                break;
            case 'description':
                this.setState({
                    description: e.target.value
                })
                break;
            case 'listed_product':
                this.setState({
                    listed_product: e.target.value
                })
                break;
            default:
        }
    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                'Authorization': token
            }
        }
        console.log(token)

        axios.post('http://localhost:5000/api/v1/events/new', qs.stringify({
            hosted_date: this.state.hosted_date,
            hosted_time:this.state.hosted_time,
            location: this.state.location,
            description: this.state.description,
            listed_product: this.state.listed_product,
        }), config)
            .then(response => {
                console.log(response.data)
                this.setState({
                    hosted_date: '',
                    hosted_time:'',
                    location: '',
                    description: '',
                    listed_product: '',
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (


            <div id="create-event-page">
                <div className="container">
                <h1>this is create a event page</h1>
                <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="string" value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} className="form-control" id="location" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hosted_date">Date of event</label>
                        <input type="date" value={this.state.hosted_date} onChange={e => { this.handleChange(e, 'hosted_date') }} className="form-control" id="hosted_date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hosted_time">Time of event</label>
                        <input type="time" value={this.state.hosted_time} onChange={e => { this.handleChange(e, 'hosted_time') }} className="form-control" id="hosted_time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="string" value={this.state.description} onChange={e => { this.handleChange(e, 'description') }} className="form-control" id="description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="listed_product">Products</label>
                        <input type="string" value={this.state.listed_product} onChange={e => { this.handleChange(e, 'listed_product') }} className="form-control" id="listed_product" />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                </div>
            </div>



        )
    }
}

export default withRouter(withCookies(CreateEvents))
