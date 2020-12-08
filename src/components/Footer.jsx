import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

class Footer extends React.Component {

    render() {
        return (

            <footer id="site-footer" className="page-footer font-small pt-5">

                    <div className="container-fluid text-center text-md-left">
                        <div className="row">
                            <div className="col-md-6 mt-md-0 mt-3">

                                <h3 className="text-uppercase font-weight-bold text-center mb-3">About Us</h3>
                                <p className="text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita sapiente sint, nulla, nihil
                                repudiandae commodi voluptatibus corrupti animi sequi aliquid magnam debitis, maxime quam recusandae
                                harum esse fugiat. Itaque, culpa?</p>

                            </div>

                            <hr className="clearfix w-100 d-md-none pb-3" />

                            <div className="col-md-3 mb-md-0 mb-3">
                                <h3 className="text-uppercase font-weight-bold text-center mb-3">APP Info</h3>
                                    <ul className="text-center">
                                        <Link to="#"><span className="mt-1 mb-3">Backend</span></Link>
                                        <Link to="#"><span className="mt-1 mb-3">Frontend</span></Link>
                                    </ul>
                            </div>

                            <hr className="clearfix w-100 d-md-none pb-3" />

                            <div className="col-md-3 mb-md-0 mb-3">
                                <h3 className="text-uppercase font-weight-bold text-center mb-3">GitHub</h3>
                                    <ul className="text-center">
                                        <Link to="#"><span className="mt-1 mb-3">Backend</span></Link>
                                        <Link to="#"><span className="mt-1 mb-3">Frontend</span></Link>
                                    </ul>
                            </div>

                        </div>

                    </div>

                    <div id="brand" className="footer-copyright text-center py-4">© 2020 Copyright: &nbsp;
                        <Link to="/">FOOD MRKTPLC</Link>
                    </div>

            </footer>


        )
    }
}

export default Footer