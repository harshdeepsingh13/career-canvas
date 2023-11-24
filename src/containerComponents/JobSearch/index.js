import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {PageHeader, PageViewContainer} from "../../config/globalStyles";
import {useJobSearchContext} from "../../context/JobSearchContext";
import {useUserContext} from "../../context/UserContextProvider";
import {JobSearchWrapper} from "./styles";
import InputV2, {SelectV2} from "../../components/InputFields/v2";
import _ from "lodash";
import {faCircleNotch, faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import {COLORS} from "../../config/colors";

const DATE_SINCE_POSTED = {
    PAST_MONTH: "past month",
    PAST_WEEK: "past week",
    "24_HOUR": "24hr"
};
const REMOTE_FILTER = {
    ON_SITE: "on site",
    REMOTE: "remote",
    HYBRID: "hybrid"
}

const JOB_TYPE = {
    FULL_TIME: "full time",
    PART_TIME: "part time",
    CONTRACT: "contract",
}

const ITEM_LIMIT = 50;

const JobSearch = props => {

    const {state: jobSearchState, loaders: jobSearchLoaders, actions: jobSearchActions} = useJobSearchContext();
    const {state: userState} = useUserContext();

    const {jobResult, hasMoreItems} = jobSearchState;
    const {jobSearchLoader} = jobSearchLoaders;
    const {jobSearch, clearJobResults} = jobSearchActions;

    const {userDetails} = userState;

    const [keywords, setKeywords] = useState(userDetails?.basicInformation?.tags?.join(","));
    const [location, setLocation] = useState(userDetails?.basicInformation?.currentLocation)
    const [dateSincePosted, setDateSincePosted] = useState(DATE_SINCE_POSTED.PAST_MONTH)
    const [remoteFilter, setRemoteFilter] = useState(REMOTE_FILTER.ON_SITE);
    const [jobType, setJobType] = useState(JOB_TYPE.FULL_TIME)

    let isMounted = useRef(false);

    const handleJobSearchDebounced = useMemo(() => {
        return _.debounce((query, isFetchMore = false) => {
            !isFetchMore && clearJobResults();
            return jobSearch(query, isFetchMore);
        }, 300);
    }, [jobSearch, clearJobResults])

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            if (keywords && location) {
                handleJobSearchDebounced({q: keywords, location, dateSincePosted, remoteFilter, jobType});
            }
        }
    }, [keywords, location, dateSincePosted, remoteFilter, jobType]);

    useEffect(() => {
        setKeywords(userDetails?.basicInformation?.tags?.join(","))
        setLocation(userDetails?.basicInformation?.currentLocation)
    }, [userDetails?.basicInformation])

    const fetchMoreJobs = useCallback((page = 0) => {
        if (keywords && location) {
            handleJobSearchDebounced({
                q: keywords,
                location,
                dateSincePosted,
                remoteFilter,
                jobType,
                start: page * ITEM_LIMIT - 1
            }, true)
        }
    }, [keywords, location, dateSincePosted, remoteFilter, jobType]);

    return <>
        <PageViewContainer>
            <PageHeader>Job Search for you!</PageHeader>
            <JobSearchWrapper>
                <div className="search-action-container">
                    <div className="search-container">
                        <InputV2
                            id={"job-search"}
                            name={"job-search"}
                            placeholder={"Search Jobs"}
                            label={"Search Jobs"}
                            value={keywords}
                            onChange={value => setKeywords(value)}
                            groupClassName={"filter-input"}
                        />

                        <InputV2
                            id={"location"}
                            name={"location"}
                            placeholder={"Location"}
                            label={"location"}
                            value={location}
                            onChange={value => setLocation(value)}
                            groupClassName={"filter-input"}
                        />
                    </div>
                    <div className="filter-container">
                        <SelectV2
                            id={"date-since-posted"}
                            name={"date-since-posted"}
                            placeholder={"Date Since Posted"}
                            label={"Date Since Posted"}
                            value={dateSincePosted}
                            onChange={value => setDateSincePosted(value)}
                            groupClassName={"filter-input"}
                        >
                            {Object.values(DATE_SINCE_POSTED).map((value) => <option value={value}>
                                {value}
                            </option>)}
                        </SelectV2>

                        <SelectV2
                            id={"remote-filter"}
                            name={"remote-filter"}
                            placeholder={"Job Location"}
                            label={"Job Location"}
                            value={remoteFilter}
                            onChange={value => setRemoteFilter(value)}
                            groupClassName={"filter-input"}
                        >
                            {Object.values(REMOTE_FILTER).map((value) => <option value={value}>
                                {value}
                            </option>)}
                        </SelectV2>

                        <SelectV2
                            id={"job-type"}
                            name={"job-type"}
                            placeholder={"Job Type"}
                            label={"Job Type"}
                            value={jobType}
                            onChange={value => setJobType(value)}
                            groupClassName={"filter-input"}
                        >
                            {Object.values(JOB_TYPE).map((value) => <option value={value}>
                                {value}
                            </option>)}
                        </SelectV2>

                    </div>
                </div>
                <hr/>

                <div className="job-results-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={page => fetchMoreJobs(page)}
                        hasMore={hasMoreItems}
                        threshold={750}
                    >
                        <div className="job-results">
                            {
                                jobResult?.map(jobItem => <div className="job-item">
                                    <img src={jobItem.companyLogo} alt={`${jobItem.company} Company Logo`}
                                         className="company-logo"/>
                                    <div className="job-details-container">
                                        <h5 className="position">{jobItem.position}</h5>
                                        <div className="company-name">{jobItem.company}</div>
                                        <div className="location">{jobItem.location}</div>
                                        <div className="extra-details">
                                            <div className="extra-item date-since">
                                                {jobItem.agoTime || moment(jobItem.date).fromNow()}
                                            </div>
                                            <div className="extra-item found-on">
                                                Found on <FontAwesomeIcon icon={faLinkedin} color={"#0b66c2"}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="action-container">
                                        <a href={jobItem.jobUrl} target="_blank">
                                            View Job <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                        </a>
                                    </div>
                                </div>)
                            }
                        </div>
                    </InfiniteScroll>
                    {
                        jobSearchLoader &&
                        <div className="loader-container">
                            <FontAwesomeIcon
                                icon={faCircleNotch}
                                spin
                                size={"xl"}
                                color={COLORS.SECONDARY.ORANGE}
                            />
                            Getting Jobs
                        </div>
                    }
                    {!hasMoreItems &&
                        <div className="loader-container">
                            No More Jobs
                        </div>
                    }
                </div>
            </JobSearchWrapper>
        </PageViewContainer>
    </>
};

JobSearch.propTypes = {
    props: PropTypes.object
};
JobSearch.defaultProps = {
    props: {}
};

export default JobSearch
