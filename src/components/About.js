import React from "react";

import Navbar from "./Navbar";

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="container-fluid" style={{ padding: "4% 12%" }}>
                <div className="jumbotron">
                    <h2 className="display-6">About BookKart, An E-Commerce mock web application</h2>
                    <hr className="my-3" />
                    <p >This web application is just an outlet for the various Frontend concepts that I got to learn about and wanted to implement.</p>
                    <p ><span className="font-weight-bold">Tech stack used:</span> React.js, HTML5, CSS3, JavaScript</p>
                    <p ><span className="font-weight-bold">Libraries used:</span> react, react-router-dom, primereact, bootstrap, redux, react-redux etc.</p>
                    <p ><span className="font-weight-bold">Concepts implemented:</span> Pagination, Searching (With Debouncing), Sorting, Global State Management, Form Validations etc.</p>
                    <br />
                    <p >BookKart Application was developed in 2021 by Rohit Reghu</p>
                    <br />
                    <div className="row lead">
                        <div className="col-lg-6">
                            <a rel="noreferrer" className="text-primary" target="_blank" id="contact" href="mailto:rohitreghu8989@gmail.com">
                                <i className="fas fa-envelope fab">&nbsp;<span className="contact-link">@rohireghu8989@gmail.com</span></i>
                            </a>
                        </div>
                        <div className="col-lg-6">
                            <a rel="noreferrer" className="text-primary" target="_blank" id="contact" href="http://www.linkedin.com/in/rohitreghu7">
                                <i className="fab fa-linkedin">&nbsp;<span className="contact-link">@rohitreghu7</span></i>
                            </a>

                        </div>
                    </div>
                    <div className="row lead">
                        <div className="col-lg-6">
                            <a rel="noreferrer" className="text-primary" target="_blank" id="contact" href="https://github.com/rohitreghu">
                                <i className="fab fa-github">&nbsp;<span className="contact-link">@rohitreghu</span></i>

                            </a>
                        </div>
                        <div className="col-lg-6">
                            <a rel="noreferrer" className="text-primary" target="_blank" id="contact" href="https://github.com/rohitreghu/ECS-JAN2021">
                                <i className="fab fa-github">&nbsp;<span className="contact-link">Github&nbsp;Repository</span></i>
                            </a>
                        </div>
                    </div>

                    
                    <p  className="text-danger" style={{paddingTop:"5%"}}>*This is just a mock application and any resemblance to any existing product/organization would purely be a coincidence</p>
                </div>

            </div>
        </div>
    );
}

export default About;