import React from 'react';
import PropTypes from 'prop-types';
import {PageViewContainer} from "../../config/globalStyles";

const JobSearch = props => {
return <>
    <PageViewContainer>
        <h3 style={{textAlign: "center"}}> Job Search Coming Soon!</h3>
    </PageViewContainer>
</>
};

JobSearch.propTypes={
    props: PropTypes.object
};
JobSearch.defaultProps={
    props: {}
};

export default JobSearch
