import React from 'react';
import {PageViewContainer} from "../../config/globalStyles";
import {HomeWrapper} from "./styles";
import {Link} from "react-router-dom";
import Button from "../../components/Button";
import {ROUTES} from "../../config/routes";
import {useAuthenticationContext} from "../../context/AuthorizationContext";

const Home = props => {

    const {isAuthorized} = useAuthenticationContext()

    return <>
        <PageViewContainer>
            <HomeWrapper>
                <div className="section header-section">
                    <p className="welcome">Welcome to Career Canvas</p>
                    <h2>Your Gateway to seamless Career Advancement</h2>
                    <p className="description">
                        Crafting the perfect resume and cover letter is not effortlessly with reach. We empower you to
                        tailor your application materials with precision, ensuring the each submission stands out!
                    </p>
                </div>

                <div className="section actions-section">
                    {
                        isAuthorized ? <>
                            <Link to={ROUTES.BUILD}>
                                <Button variant={"secondary"} className={"action-button"}>Resume Templates</Button>
                            </Link>
                            <Link to={ROUTES.DETAILS}>
                                <Button variant={"primary"} className={"action-button"}>Your Details</Button>
                            </Link>
                        </> :<>
                            <Link to={ROUTES.REGISTER}>
                                <Button variant={"secondary"} className={"action-button"}>Register</Button>
                            </Link>
                            <Link to={ROUTES.LOGIN}>
                                <Button variant={"primary"} className={"action-button"}>Login</Button>
                            </Link></>
                    }

                </div>
                <div className="section features-section">
                    <h3>Unlock the power of precision job applications</h3>
                    <div className="features-container">
                        <div className="feature">
                            <img src="/assets/job-search-illustration.png" alt="Job Search" className="illustration"/>
                            <h4>Intuitive Job Search</h4>
                            <p className="description">
                                Explore relevant job opportunities based on your generated resumes, enhancing your job search experience
                            </p>
                        </div>
                        <div className="feature">
                            <img src="/assets/resume-management-illustration.png" alt="Resume Management" className="illustration"/>
                            <h4>Effortless Resume Management</h4>
                            <p className="description">
                                Seamless manage and customize multiple resume templates tailored to diverse job opportunities
                            </p>
                        </div>
                        <div className="feature">
                            <img src="/assets/cover-letter-illustration.png" alt="Cover Letter Generation" className="illustration"/>
                            <h4>AI Powered Cover Letter Generation</h4>
                            <p className="description">
                                Leverage the OPenAI API to create personalized and impactful cover letters for every application
                            </p>
                        </div>
                    </div>
                </div>
            </HomeWrapper>
        </PageViewContainer>
    </>
};

Home.propTypes = {};

export default Home
