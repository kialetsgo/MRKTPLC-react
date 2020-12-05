import React from 'react'
import axios from 'axios'
import qs from 'qs'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            location: ''
        }
    }

    getProfile() {
        // make api call to get profile
        return axios.get('/users/profile', qs.stringify({
            email: this.state.email,
            location: this.state.location,
        }))
            .then(response => {
                this.setState({
                    email: response.data.email,
                    location: response.data.location
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleLocationChange(e) {
        this.setState({
            location: e.target.value
        })
    }

    handleFormSubmission(e) {
        e.preventDefault()

        console.log(`form submission activated`)

        // make api call to get profile
        axios.patch('/users/profile', qs.stringify({
            location: this.state.location
        }))
            .then(response => {
                console.log(response.data)
            })

            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return(
            <div className="page-userProfile">
                <div className="container">
                    <form className="mt-5 mb-5" onSubmit={ e => { this.handleFormSubmission(e) } }>
                        {/* <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" defaultValue={this.state.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="location">Select Area</label>
                            <select className="form-control" onChange={e => { this.handleLocationChange(e) }} id="location">
                                <option value="">---PLEASE SELECT---</option>
                                <option value="Ang Mo Kio">Ang Mo Kio</option>
                                <option value="Bedok">Bedok</option>
                                <option value="Bishan">Bishan</option>
                                <option value="Bukit Batok">Bukit Batok</option>
                                <option value="Bukit Merah">Bukit Merah</option>
                                <option value="Bukit Panjang">Bukit Panjang</option>
                                <option value="Bukit Timah">Bukit Timah</option>
                                <option value="Central">Central</option>
                                <option value="Choa Chu Kang">Choa Chu Kang</option>
                                <option value="Clementi">Clementi</option>
                                <option value="Geylang">Geylang</option>
                                <option value="Hougang">Hougang</option>
                                <option value="Jurong East">Jurong East</option>
                                <option value="Jurong West">Jurong West</option>
                                <option value="Kallang / Whampoa">Kallang / Whampoa</option>
                                <option value="Marine Parade">Marine Parade</option>
                                <option value="Pasir Ris">Pasir Ris</option>
                                <option value="Punggol">Punggol</option>
                                <option value="Queenstown">Queenstown</option>
                                <option value="Sembawang">Sembawang</option>
                                <option value="Sengkang">Sengkang</option>
                                <option value="Serangoon">Serangoon</option>
                                <option value="Tampines">Tampines</option>
                                <option value="Toa Payoh">Toa Payoh</option>
                                <option value="Woodlands">Woodlands</option>
                                <option value="Yishun">Yishun</option>
                            </select>
                        </div>
        
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default UserProfile
