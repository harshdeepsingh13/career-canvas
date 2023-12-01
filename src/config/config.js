module.exports = {
    STYLE_CONSTANTS: {
        BASIC_COLORS: {
            LIGHT_BLUE_GREY: "#d7f3f3",
            GREYISH_BROWN: "#424242",
            SALMON: "#ff6d6d",
            DUSK: "#4a5977",
            BLUEY_GREY: "#99a1b2",
            GREYISH_BROWN_TWO: "#414141",
            BLACK: "#000000"
        },
        PRIMARY_COLORS: {
            PRIMARY: "#0077B6",
            PRIMARY_LIGHT: "#DBF5FA",
            PRIMARY_BACKGROUND: "#F2FBFD",
            PRIMARY_DARK: "#010220"
        },
        BACKGROUND_AND_BORDERS: {
            GREY_DARK: "#dbdbdb",
            GREY_MEDIUM: "#ebebeb",
            GREY_LIGHT: "#f3f3f3"
        },
        TEXT: {
            GREY_DARK: "#565555",
            GREY_MEDIUM: "#6c6e6e",
            GREY_LIGHT: "#999999"
        },
        BORDER_RADIUS: '3px',
        BLACK_COLOR: '#8d8d8d',
        TEMPLATE_CONSTANTS: {
            SOLID_BLUE_TEMPLATE: {
                PRIMARY: '#509edc',
                PRIMARY_DARK: '#425a70'
            },
            DEFAULT_BLUE_TEMPLATE: {
                PRIMARY: '#0a96c3',
                PRIMARY_DARK: '#425a70'
            },
            DEFAULT_GRAY_TEMPLATE: {
                PRIMARY: "#34495e",
                PRIMARY_DARK: "#2c3e50"
            },
            MODERN_RED_TEMPLATE: {
                PRIMARY: "#ff6b6b",
                PRIMARY_DARK: "#ee5253"
            }
        }
    },
    EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    PHONE_REGEX: /^\d{10}$/g,
    ERROR_MESSAGES: {
        REQUIRED_FIELD_EMPTY: 'required field',
        EMAIL_NOT_FORMATTED: 'enter proper email id',
        VERIFY_PASSWORD: 'passwords entered do not match',
        SHORT_PASSWORD: 'Password should be atleast 8 characters long, should be alpha-numeric and should have atleast one special character',
        WEBSITE_NOT_VALID: 'website is not valid',
        CONTACT_NUMBER_NOT_VALID: 'Contact number entered is not valid',
        NUMBER_OUT_OF_RANGE: 'the number entered is out of given range'
    },
    LOCAL_STORAGE_KEY: {TOKEN: 'cct', USER_DETAILS: "ccud"},
    STATUS: {
        DEFAULT: "DEFAULT",
        STARTED: "STARTED",
        SUCCESS: "SUCCESS",
        FAILURE: "FAILURE"
    },
    SWEET_ALERT_TYPES: {
        SUCCESS: "success",
        ERROR: "error",
        WARNING: "warning",
        INFO: "info",
        QUESTION: "question"
    },
    COPYRIGHT_TEXT: "&copy; Copyright 2019",
    MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    CLOUDINARY: {
        RES_LINK: {
            USER_AVATAR: 'https://res.cloudinary.com/harshdeep-singh/image/upload/v1569133686/resumeCreator/User%20Avatar/'
        }
    },
    ICONS_PNG: {
        AT_ICON: "assets/icons/at-solid.svg",
        CALENDAR_ICON: "assets/icons/calendar-alt-solid.svg",
        FACEBOOK_ICON: "assets/icons/facebook-square-brands.svg",
        GITHUB_ICON: "assets/icons/github-brands.svg",
        WEBSITE_ICON: "assets/icons/globe-solid.svg",
        INSTAGRAM_ICON: "assets/icons/instagram-brands.svg",
        LINKEDIN_ICON: "assets/icons/linkedin-brands.svg",
        LOCATION_ICON: "assets/icons/map-marker-alt-solid.svg",
        CONTACT_ICON: "assets/icons/phone-alt-solid.svg"
    },
    API_ROUTES: {
        BASE_URL_V1: "/api/v1",
        REGISTER_USER: "/user/register",
        LOGIN_USER: "/user/login",
        COMPLETE_USER_DETAILS: "/user/completeInformation",
        USER_DETAILS: "/user/basicInformation",
        // UPDATE_USER: "/user",
        // UPLOAD_AUDIO: "/music",
        // FETCH_MEDIA: "/music",
        // DELETE_MEDIA: (id) => `/music/${id}`,
        // RENAME_MEDIA: id => `/music/rename/${id}`,
        PROFESSIONAL_SUMMARY: "/user/professionalSummary",
        RESUME_TEMPLATE: "/resumeTemplate",
        RESUME_TEMPLATE_ALL: "/resumeTemplate/all",
        TEMPLATE_PDF_VIEW: "/resumeTemplate/pdfTemplate",
        UPDATE_USER_INFORMATION: {
            BASIC_INFORMATION: "/user/basicInformation",
            EDUCATION_INFORMATION: "/user/educationInformation",
            SKILL_INFORMATION: "/user/skillInformation",
            WORK_EXPERIENCE_INFORMATION: "/user/workExperienceInformation",
            TRAINING_INFORMATION: "/user/trainingInformation",
            PROJECT_INFORMATION: "/user/projectInformation",
        },
        GENERATE_COVER_LETTER: "/coverLetter/generate",
        JOB_SEARCH: "/jobs/search",
    },
    EDUCATION_TYPES: {
        secondary: "secondary",
        seniorSecondary: "senior secondary",
        graduation: "graduation",
        postGraduation: "post graduation",
        doctorate: "doctorate"
    }
};
