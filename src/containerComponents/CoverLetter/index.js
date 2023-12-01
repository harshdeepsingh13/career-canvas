import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {PageHeader, PageViewContainer} from "../../config/globalStyles";
import {CoverLetterWrapper} from "./styles";
import {useCoverLetterContext} from "../../context/CoverLetterContext";
import RichTextInput from "../../components/RichTextInput";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate, faCheck, faCircleNotch, faCode, faCopy} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../../config/colors";
import {convert} from "html-to-text";

const CoverLetter = props => {

    const [jobDescription, setJobDescription] = useState("")
    const [myCoverLetter, setMyCoverLetter] = useState("")
    const [isCopyDone, setIsCopyDone] = useState(false)

    const {state: coverLetterState, loaders: coverLetterLoaders, actions: coverLetterActions} = useCoverLetterContext();

    const {generateCoverLetter} = coverLetterActions;
    const {generateCoverLetterLoader} = coverLetterLoaders;
    const {coverLetter} = coverLetterState;

    let isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            // coverLetterActions.generateCoverLetter();
            isMounted.current = true;
        }
    }, []);

    useEffect(() => {
        if (coverLetter.length) {
            setMyCoverLetter(coverLetter);
        }
    }, [coverLetter]);

    const onGenerateClick = () => {
        generateCoverLetter(jobDescription);
    }

    const onCopyCoverLetter = async () => {
        /*const tempDiv = document.createElement("div");
        tempDiv.appendChild(myCoverLetter);
        console.log("tempDiv.innerhtml", tempDiv.innerHTML)
        console.log("tempDiv.innerhtml", tempDiv.innerText)
        await navigator.clipboard.writeText(tempDiv.innerHTML);*/
        const text = convert(myCoverLetter, {wordwrap: false});
        console.log("text", text);
        await navigator.clipboard.writeText(text);
        setIsCopyDone(true);
        setTimeout(() => {
            setIsCopyDone(false);
        }, 3000)

        // tempDiv.remove();
    }

    return <>
        <PageViewContainer>
            <PageHeader>Cover Letter Generator</PageHeader>
            <CoverLetterWrapper>
                <div className="job-description-container">
                    <RichTextInput
                        id={"job-description"}
                        name={"job-description"}
                        label={"Job Description"}
                        placeholder={"Add the job description here"}
                        value={jobDescription}
                        onChange={value => setJobDescription(value)}
                    />
                </div>
                <div className="cover-letter-result-container">
                    {generateCoverLetterLoader &&
                        <div className={"cover-letter-loader-container"}>
                            <FontAwesomeIcon
                                icon={faCircleNotch}
                                spin
                                color={COLORS.PRIMARY.BLUE}
                                className={"cover-letter-loader"}
                            /> Generating cover letter
                        </div>
                    }
                    {myCoverLetter ? <>
                            <div className="cover-letter-header">
                                {!generateCoverLetterLoader &&
                                    <>
                                        <Button
                                            variant={"outline-dark"}
                                            className={"copy-action-btn"}
                                            onClick={onCopyCoverLetter}
                                        >
                                            {isCopyDone ?
                                                <><FontAwesomeIcon icon={faCheck}/> Copied!</> :
                                                <><FontAwesomeIcon icon={faCopy}/> Copy</>
                                            }
                                        </Button>

                                        <Button
                                            className={"button-63 sm"}
                                            onClick={onGenerateClick}
                                        >
                                            <FontAwesomeIcon icon={faArrowsRotate}/> Generate Again
                                        </Button>
                                    </>
                                }
                            </div>
                            <RichTextInput
                                id={"cover-letter"}
                                name={"cover-letter"}
                                value={myCoverLetter}
                                onChange={value => setMyCoverLetter(value)}
                                groupClassName={"cover-letter-rich-input"}
                            />
                        </> :
                        <Button className={"button-63"} onClick={onGenerateClick}>
                            <FontAwesomeIcon icon={faCode}/> Generate Cover Letter
                        </Button>
                    }
                </div>
            </CoverLetterWrapper>
        </PageViewContainer>
    </>
};

CoverLetter.propTypes = {
    props: PropTypes.object
};
CoverLetter.defaultProps = {
    props: {}
};

export default CoverLetter
