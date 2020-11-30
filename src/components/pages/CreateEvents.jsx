import React, { Component } from 'react'
import axios from'axios'
import qs from 'qs'
import './CreateEvents.scss'

class CreateEvents extends Component {


    constructor(props) {
        super(props)
        this.state = {
            hosted_by: '',
            hosted_date: '',
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
        axios.post('http://localhost:5000/api/vi/events/new', qs.stringify({
            hosted_by: this.state.hosted_by,
            hosted_date: this.state.hosted_date,
            location: this.state.location,
            description: this.state.description,
            listed_product: this.state.listed_product,
        }))
            .then(response => {
                console.log(response.data)
                this.setState({
                    hosted_by: '',
                    hosted_date: '',
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


            <div id="create-event-page" className="container">
                <p>this is create a event page</p>
                <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                <div className="form-group">
                        <label htmlFor="hosted_by">Hosted by:</label>
                        <input type="string" value={this.state.hosted_by} onChange={e => { this.handleChange(e, 'hosted_by') }} className="form-control" id="hosted_by" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="string" value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} className="form-control" id="location" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hosted_date">Date of event</label>
                        <input type="date" value={this.state.hosted_date} onChange={e => { this.handleChange(e, 'hosted_date') }} className="form-control" id="hosted_date" />
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



        )
    }
}

export default CreateEvents
