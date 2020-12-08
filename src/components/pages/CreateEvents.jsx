import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
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
            contact_number: '',
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
            case 'contact_number':
                this.setState({
                    contact_number: e.target.value
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
            hosted_time: this.state.hosted_time,
            location: this.state.location,
            description: this.state.description,
            listed_product: this.state.listed_product,
            contact_number:this.state.contact_number,
        }), config)
            .then(response => {
                console.log(response.data)
                this.setState({
                    hosted_date: '',
                    hosted_time: '',
                    location: '',
                    description: '',
                    listed_product: '',
                    contact_number:'',
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
                            <select value={this.state.location} onChange={e => { this.handleChange(e, 'location') }} className="form-control" id="location">
                                <option>---PLEASE SELECT---</option>
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
                            <label htmlFor="hosted_date">Date of event</label>
                            <input type="date" value={moment(this.state.hosted_date).format("YYYY-MM-DD")} onChange={e => { this.handleChange(e, 'hosted_date') }} className="form-control" id="hosted_date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hosted_time">Time of event</label>
                            <input type="time" value={this.state.hosted_time} onChange={e => { this.handleChange(e, 'hosted_time') }} className="form-control" id="hosted_time" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact_number">Contact</label>
                            <input type="number" value={this.state.contact_number} onChange={e => { this.handleChange(e, 'contact_number') }} className="form-control" id="contact_number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea type="string" value={this.state.description} onChange={e => { this.handleChange(e, 'description') }} className="form-control" id="description"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Host</button>
                    </form>
                </div>
            </div >



        )
    }
}

export default withRouter(withCookies(CreateEvents))
