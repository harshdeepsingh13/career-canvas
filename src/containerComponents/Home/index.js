import React from 'react';
import {PageViewContainer} from "../../config/globalStyles";
import ResumeBuilder from "../../components/ResumeBuilder";

const Home = props => {
    return <>
        <PageViewContainer>
            <ResumeBuilder/>
        </PageViewContainer>
    </>
};

Home.propTypes = {};

export default Home
