import React, {useEffect, useRef, useState} from 'react';
// import "./styles.scss"
import PropTypes from 'prop-types';
import Error from "../Error";
import {EMAIL_REGEX, ERROR_MESSAGES, STYLE_CONSTANTS} from "../../config/config";
import Loader from "../Loader";
import Tag from "../Tag";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {
	faAt,
	faBook,
	faBookOpen,
	faBullseye,
	faCalendarDay,
	faCrosshairs,
	faGlobe,
	faHeart,
	faICursor,
	faKey,
	faLayerGroup,
	faLink,
	faMapMarkerAlt,
	faPhoneAlt,
	faSchool,
	faSignature,
	faStarHalfAlt,
	faTags,
	faUniversity,
	faVial
} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {faBuilding} from "@fortawesome/free-regular-svg-icons";

library.add(faICursor, faAt, faTags, faSignature, faMapMarkerAlt, faKey, faGlobe, fab, faHeart, faPhoneAlt, faCalendarDay, faBullseye, faBookOpen, faUniversity, faSchool, faBook, faStarHalfAlt, faVial, faBuilding, faCrosshairs, faLink, faLayerGroup);

//Input type Text
export const InputText = React.forwardRef((props, ref) => {
	const {
		name,
		id,
		handleChange: handleChangeFromProps,
		placeholder,
		value,
		required,
		handleError,
		styles,
		checkValue,
		isEmpty,
		iconName,
		disabled,
		canBeCanceled,
		onCancel
	} = props;

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	useEffect(
		() => {
			required && handleError(name, isError)
		},
		[isError]
	);
	useEffect(
		() => {
			if (isEmpty) {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			}
		},
		[isEmpty]
	);
	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;
		if (required && value === '') {
			setIsError(true);
			setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY)
		} else {
			const [isError, errorMessage] = checkValue(value);
			if (isError) {
				setIsError(true);
				setErrorMessage(errorMessage)
			} else {
				setIsError(false);
				setErrorMessage('');
			}
		}
		handleChangeFromProps(event);
	};
	return (
		<div className="field-container">
			<div className="field">
				<FontAwesomeIcon
					icon={iconName}
					color={
						(isError) ?
							'red' :
							STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
					}
					className="icon"
					style={
						{
							opacity: disabled ?
								0.4 :
								1,
							pointerEvents: disabled ?
								'none' :
								''
						}
					}
				/>
				<div className="input-container">
					<input
						type="text"
						className="inputText"
						name={name}
						id={id}
						onChange={handleChange}
						placeholder={`${placeholder}${
							required ?
								'*' :
								''
						}`}
						value={value}
						disabled={disabled}
						style={
							{
								...styles,
								borderBottomColor: isError ?
									'red' :
									'',
								color: isError ?
									'red' :
									'',
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									'',
							}
						}
						ref={ref}
					/>
					<label htmlFor={id} className="field-label">{placeholder}</label>
				</div>
				{
					canBeCanceled &&
					<FontAwesomeIcon
						icon={"times"}
						size={"lg"}
						color={
							(isError) ?
								'red' :
								STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
						}
						className="cancel"
						style={
							{
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									'',
							}
						}
						onClick={onCancel}
					/>
				}
			</div>
			{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}
		</div>
	)
});
InputText.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	checkValue: PropTypes.func,
	isEmpty: PropTypes.bool,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	disabled: PropTypes.bool,
	canBeCanceled: PropTypes.bool,
	onCancel: PropTypes.func
};
InputText.defaultProps = {
	name: 'inputText',
	id: 'inputText',
	placeholder: 'Input Type Text',
	value: '',
	handleChange: () => console.log('Input Type Text'),
	required: false,
	handleError: () => console.log('Input Type Text Error'),
	styles: {},
	checkValue: () => [false, ''],
	isEmpty: false,
	iconName: "i-cursor",
	disabled: false,
	canBeCanceled: false,
	onCancel: () => console.log('Input Type Text OnCancel')
};

export const InputDate = props => {
	const {
		name,
		id,
		placeholder,
		value,
		handleChange: handleChangeFromProps,
		required,
		handleError,
		styles,
		checkValue,
		isEmpty,
		iconName,
		disabled,
		completeDate
	} = props;
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	useEffect(
		() => {
			required && handleError(name, isError)
		},
		[isError]
	);
	useEffect(
		() => {
			if (isEmpty) {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			}
		},
		[isEmpty]
	);
	const dateRef = useRef(undefined);
	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;
		if (required && value === '') {
			setIsError(true);
			setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY)
		} else {
			const [isError, errorMessage] = checkValue(value);
			if (isError) {
				setIsError(true);
				setErrorMessage(errorMessage)
			} else {
				setIsError(false);
				setErrorMessage('');
			}
		}
		handleChangeFromProps(event);
	};
	return (
		<div className="field-container">
			<div className="field">
				<FontAwesomeIcon
					icon={iconName}
					color={
						(isError) ?
							'red' :
							STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
					}
					className="icon"
					style={
						{
							opacity: disabled ?
								0.4 :
								1,
							pointerEvents: disabled ?
								'none' :
								'',
						}
					}
				/>
				<div className="input-container">
					<input
						type="text"
						onFocus={() => dateRef.current.type = completeDate ? 'date' : 'month'}
						onBlur={() => dateRef.current.type = 'text'}
						className="inputDate"
						name={name}
						id={id}
						onChange={handleChange}
						placeholder={`${placeholder}${
							required ?
								'*' :
								''
						}`}
						value={value}
						disabled={disabled}
						style={
							{
								...styles,
								borderBottomColor: isError ?
									'red' :
									'',
								color: isError ?
									'red' :
									'',
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									'',
							}
						}
						ref={dateRef}
					/>
					<label htmlFor={id} className="field-label">{placeholder}</label>
				</div>
			</div>
			{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}
		</div>
	)
};
InputDate.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	checkValue: PropTypes.func,
	isEmpty: PropTypes.bool,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	disabled: PropTypes.bool,
	completeDate: PropTypes.bool
};
InputDate.defaultProps = {
	name: 'inputText',
	id: 'inputText',
	placeholder: 'Input Type Text',
	value: '',
	handleChange: () => console.log('Input Type Text'),
	required: false,
	handleError: () => console.log('Input Type Text Error'),
	styles: {},
	checkValue: () => [false, ''],
	isEmpty: false,
	iconName: "calendar-day",
	disabled: false,
	completeDate: false
};

//Input type Number
export const InputNumber = props => {
	const {
		name,
		id,
		placeholder,
		value,
		handleChange: handleChangeFromProps,
		required,
		handleError,
		styles,
		checkValue,
		isEmpty,
		disabled,
		iconName,
		minCap,
		maxCap
	} = props;
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	useEffect(
		() => {
			required && handleError(name, isError)
		},
		[isError]
	);
	useEffect(
		() => {
			if (isEmpty) {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			}
		},
		[isEmpty]
	);
	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;
		if (required && value === '') {
			setIsError(true);
			setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY)
		} else {
			const [isError, errorMessage] = checkValue(value);
			if (isError) {
				setIsError(true);
				setErrorMessage(errorMessage);
			} else {
				setIsError(false);
				setErrorMessage('');
			}
		}
		handleChangeFromProps(event);
	};
	return (
		<div className="field-container">
			<div className="field">
				<FontAwesomeIcon
					icon={iconName}
					color={
						(isError) ?
							'red' :
							STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
					}
					className="icon"
					style={
						{
							opacity: disabled ?
								0.4 :
								1,
							pointerEvents: disabled ?
								'none' :
								'',
						}
					}
				/>
				<div className="input-container">
					<input
						type="number"
						className="inputNumber"
						name={name}
						id={id}
						onChange={handleChange}
						placeholder={`${placeholder}${
							required ?
								'*' :
								''
						}`}
						value={value}
						disabled={disabled}
						style={
							{
								...styles,
								borderBottomColor: isError ?
									'red' :
									'',
								color: isError ?
									'red' :
									'',
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									''
							}
						}
						min={minCap}
						max={maxCap}
					/>
					<label htmlFor={id} className="field-label">{placeholder}</label>
				</div>
			</div>
			{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}
		</div>
	)
};
InputNumber.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	checkValue: PropTypes.func,
	isEmpty: PropTypes.bool,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	disabled: PropTypes.bool,
	minCap: PropTypes.number,
	maxCap: PropTypes.number
};
InputNumber.defaultProps = {
	name: 'inputText',
	id: 'inputText',
	placeholder: 'Input Type Text',
	value: '',
	handleChange: () => console.log('Input Type Text'),
	required: false,
	handleError: () => console.log('Input Type Text Error'),
	styles: {},
	checkValue: () => [false, ''],
	isEmpty: false,
	iconName: "i-cursor",
	disabled: false,
	minCap: 1,
	maxCap: 100
};

//Input type Text Area
export const InputTextArea = (props) => {
	const {
		name,
		id,
		handleChange: handleChangeFromProps,
		placeholder,
		value,
		required,
		handleError,
		styles,
		checkValue,
		rows,
		cols,
		isEmpty,
		iconName,
		disabled,
		characterLimit
	} = props;
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	useEffect(
		() => {
			required && handleError(name, isError)
		},
		[isError]
	);
	useEffect(
		() => {
			if (isEmpty) {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			}
		},
		[isEmpty]
	);
	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;
		if (value.length <= characterLimit) {
			if (required && value === '') {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY)
			} else {
				const [isError, errorMessage] = checkValue(value);
				if (isError) {
					setIsError(true);
					setErrorMessage(errorMessage);
				} else {
					setIsError(false);
					setErrorMessage('');
				}
			}
			handleChangeFromProps(event);
		}
	};
	return (
		<div className="field-container">
			<div className="field"
			     style={
				     {
					     alignItems: "flex-start"
				     }
			     }
			>
				<FontAwesomeIcon
					icon={iconName}
					color={
						(isError) ?
							'red' :
							STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
					}
					className="icon"
					style={
						{
							opacity: disabled ?
								0.4 :
								1,
							pointerEvents: disabled ?
								'none' :
								'',
							marginTop: '10px'
						}
					}
				/>
				<div className="input-container">
					<textarea
						className="inputTextArea"
						name={name}
						id={id}
						onChange={handleChange}
						placeholder={`${placeholder}${
							required ?
								'*' :
								''
						}`}
						value={value}
						disabled={disabled}
						style={
							{
								...styles,
								borderBottomColor: isError ?
									'red' :
									'',
								color: isError ?
									'red' :
									'',
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									''
							}
						}
						rows={rows}
						cols={cols}
					/>
					<label htmlFor={id} className="field-label">{placeholder}</label>
				</div>
				<div className="characterCount">
					{value.length}/{characterLimit}
				</div>
			</div>
			{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}
		</div>
	)
};
InputTextArea.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	checkValue: PropTypes.func,
	rows: PropTypes.number,
	cols: PropTypes.number,
	isEmpty: PropTypes.bool,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	disabled: PropTypes.bool,
	characterLimit: PropTypes.number
};
InputTextArea.defaultProps = {
	name: 'inputTextArea',
	id: 'inputTextArea',
	placeholder: 'Input Type TextArea',
	value: '',
	handleChange: () => console.log('Input Type TextArea'),
	required: false,
	handleError: () => console.log('Input Type TextArea Error'),
	styles: {},
	checkValue: () => [false, ''],
	rows: 5,
	cols: 5,
	isEmpty: false,
	iconName: "i-cursor",
	disabled: false,
	characterLimit: 100
};

//Input type Email
export const InputEmail = (props) => {
	const {
		name,
		id,
		placeholder,
		value,
		handleChange: handleChangeFromProps,
		required,
		handleError,
		styles,
		checkValue,
		handleBlur,
		emailAvailability,
		isEmpty,
		disabled,
		iconName,
		handleKeyPress: handleKeyPressFromProps
	} = props;
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	/*
	this.state = {
		isError: false,
		errorMessage: ''
	}
	*/
	useEffect(
		() => handleError(name, isError, errorMessage),
		[isError]
	);
	useEffect(
		() => {
			if (isEmpty) {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			}
		},
		[isEmpty]
	);
	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;
		if (required && value === '') {
			setIsError(true);
			setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
		} else {
			if (value.match(EMAIL_REGEX)) {
				setIsError(false);
				setErrorMessage('');
			} else {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.EMAIL_NOT_FORMATTED);
			}
		}
		handleChangeFromProps(event);
	};
	const handleKeyPress = (event) => {
		handleKeyPressFromProps(event);
	}
	return (
		<div className="field-container">
			<div className="field">
				<FontAwesomeIcon
					icon={iconName}
					color={
						(isError) ?
							'red' :
							STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
					}
					className="icon"
					style={
						{
							opacity: disabled ?
								0.4 :
								1,
							pointerEvents: disabled ?
								'none' :
								'',
						}
					}
				/>
				<div className="input-container">
					<input
						type="email"
						className={"inputEmail"}
						name={name}
						id={id}
						placeholder={`${placeholder}${
							required ?
								'*' :
								''
						}`}
						value={value}
						onChange={handleChange}
						onBlur={handleBlur}
						disabled={disabled}
						onKeyDown={handleKeyPress}
						style={
							{
								...styles,
								borderBottomColor: (isError) || (emailAvailability !== "ignore" &&
									emailAvailability === "not available") ?
									'red' :
									'',
								color: (isError) || (emailAvailability !== "ignore" &&
									emailAvailability === "not available") ?
									'red' :
									'',
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									'',
							}
						}
					/>
					<label htmlFor={id} className="field-label">{placeholder}</label>
				</div>
			</div>

			{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}
			{
				emailAvailability !== "ignore" &&
				emailAvailability === "not available" &&
				<Error
					message={"Email is already used."}
					styles={
						{
							textAlign: "right"
						}
					}
				/>
			}
			{/*{
				emailAvailability !== "ignore" &&
				emailAvailability === "available" &&
				<Error
					message={"Email Available"}
					styles={
						{
							textAlign: "right",
							color: "green"
						}
					}
				/>
			}*/}
		</div>
	)
};
InputEmail.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	handleBlur: PropTypes.func,
	emailAvailability: PropTypes.oneOf(["available", "not available", "ignore"]),
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	checkValue: PropTypes.func,
	isEmpty: PropTypes.bool,
	disabled: PropTypes.bool,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	handleKeyPress: PropTypes.func
};
InputEmail.defaultProps = {
	name: 'inputEmail',
	id: 'inputEmail',
	placeholder: 'Input Type Email',
	value: '',
	handleChange: () => console.log('Input Type Email'),
	handleBlur: () => console.log('Input Type Email Blurr'),
	emailAvailability: "ignore",
	required: false,
	handleError: () => console.log('Input Type Email Error'),
	styles: {},
	checkValue: () => [false, ''],
	isEmpty: false,
	disabled: false,
	iconName: "at",
	handleKeyPress: () => {
	}
};

//Input type Password
export const InputPassword = (props) => {
	const {
		name,
		id,
		placeholder,
		handleChange: handleChangeFromProps,
		required,
		value,
		handleError,
		styles,
		isEmpty,
		checkValue,
		iconName,
		disabled,
		handleKeyPress: handleKeyPressFromProps
	} = props;
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	useEffect(
		() => {
			required && handleError(name, isError, errorMessage)
		},
		[isError]
	);
	useEffect(
		() => {
			if (isEmpty) {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			}
		},
		[isEmpty]
	);
	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;
		if (require && value === '') {
			required && setIsError(true);
			required && setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY)
		} else {
			const [isError, errorMessage] = checkValue(value);
			if (isError) {
				setIsError(true);
				setErrorMessage(errorMessage);
			} else {
				setIsError(false);
				setErrorMessage('');
			}
		}

		handleChangeFromProps(event);
	};
	const handleKeyPress = (event) => {
		handleKeyPressFromProps(event);
	}
	return (
		<div className="field-container">
			<div className="field">
				<FontAwesomeIcon
					icon={iconName}
					color={
						(isError) ?
							'red' :
							STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
					}
					className="icon"
					style={
						{
							opacity: disabled ?
								0.4 :
								1,
							pointerEvents: disabled ?
								'none' :
								'',
						}
					}
				/>
				<div className="input-container">
					<input
						type="password"
						className="inputPassword"
						name={name}
						id={id}
						placeholder={`${placeholder}${
							required ?
								'*' :
								''
						}`}
						value={value}
						disabled={disabled}
						style={
							{
								...styles,
								borderBottomColor: isError ?
									'red' :
									'',
								color: isError ?
									'red' :
									'',
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									''
							}
						}
						onChange={handleChange}
						onKeyDown={handleKeyPress}
					/>
					<label htmlFor={id} className="field-label">{placeholder}</label>
				</div>
			</div>
			{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}
		</div>
	)
};
InputPassword.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	isEmpty: PropTypes.bool,
	checkValue: PropTypes.func,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	disabled: PropTypes.bool,
	handleKeyPress: PropTypes.func
};
InputPassword.defaultProps = {
	name: 'inputPassword',
	id: 'inputPassword',
	placeholder: 'Input Type Password',
	value: '',
	handleChange: () => console.log('Input Type Password'),
	required: false,
	handleError: () => console.log('Input Type Password Error'),
	styles: {},
	isEmpty: false,
	checkValue: () => [false, ''],
	iconName: "key",
	disabled: false,
	handleKeyPress: () => {
	}
};

//Input Type Select
export const InputSelect = (props) => {
	const {
		name,
		id,
		placeholder,
		handleChange: handleChangeFromProps,
		value,
		required,
		options,
		defaultIndex,
		handleError,
		styles,
		iconName,
		disabled
	} = props;

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(
		() => {
			required && handleError(name, isError)
		},
		[isError]
	);

	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;

		if (required) {
			if (value === '') {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage('');
			}
		}
		handleChangeFromProps(event)
	};

	return (
		<div className="field-container">
			<div className="field">
				<label htmlFor={name}>
					<FontAwesomeIcon
						icon={iconName}
						color={
							(isError) ?
								'red' :
								STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
						}
						className="icon"
						style={
							{
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									'',
							}
						}
					/>
					{
						placeholder
					}
					{
						required ?
							'*' :
							''
					}
					<select
						name={name}
						id={id}
						className={"inputSelect"}
						value={value}
						onChange={handleChange}
						disabled={disabled}
						style={
							{
								...styles,
								borderBottomColor: isError ?
									'red' :
									'',
								color: isError ?
									'red' :
									'',
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									''
							}
						}
					>
						{
							options.map((element, index) =>
								<option
									key={index}
									value={element.value}
									disabled={element.isDefault}
									selected={element.isDefault}
									style={
										{
											opacity: element.isDefault ?
												0.4 :
												1,
											pointerEvents: element.isDefault ?
												'none' :
												'',
										}
									}
								>
									{
										element.text.toLowerCase()
									}
								</option>
							)
						}
					</select>
				</label>
			</div>

			{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}
		</div>
	)
};
InputSelect.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape(
		{
			value: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			isDefault: PropTypes.bool
		}
	).isRequired).isRequired,
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func,
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	disabled: PropTypes.bool
};
InputSelect.defaultProps = {
	name: 'inputSelect',
	id: 'inputSelect',
	placeholder: 'Input Type Select',
	value: '',
	options: [],
	handleChange: () => console.log('Input Type Select'),
	required: false,
	handleError: () => console.log('Input Type Select Error'),
	styles: {},
	disabled: false
};

//Input Type Tags
export const InputTags = props => {
	const {
		name,
		id,
		placeholder,
		value,
		handleChange: handleChangeFromProps,
		required,
		handleError,
		styles,
		checkValue,
		isEmpty,
		iconName,
		disabled: disabledFromProps,
		numberOfTagsAllowed
	} = props;

	const [tags, setTags] = useState({
		value: value ? value : []
	});
	const [disabled, setDisabled] = useState(disabledFromProps);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	console.log('inputTags ', tags);
	useEffect(
		() => {
			required && handleError(name, isError)
		},
		[isError]
	);
	useEffect(
		() => {
			if (isEmpty) {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			}
		},
		[isEmpty]
	);
	useEffect(
		() => {
			if (tags.value.length >= numberOfTagsAllowed) {
				setDisabled(true);
				handleChange({
					target: {
						name,
						value: tags.value
					}
				})
			} else {
				setDisabled(disabledFromProps || false);
				handleChange({
					target: {
						name,
						value: tags.value
					}
				})
			}
		},
		[tags]
	);

	const tagInputRef = useRef(undefined);

	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;
		if (required && tags.value.length === 0) {
			setIsError(true);
			setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY)
		} else {
			const [isError, errorMessage] = checkValue(value);
			if (isError) {
				setIsError(true);
				setErrorMessage(errorMessage)
			} else {
				setIsError(false);
				setErrorMessage('');
			}
		}
		handleChangeFromProps(event);
	};
	const handleTagsInput = ({
		                         key,
		                         target: {
			                         value,
			                         name
		                         }
	                         }) => {
		console.log('keycode', key);
		if (key === 'Enter' && value.length !== 0) {
			setTags({...tags, value: [...tags.value, value]});
			tagInputRef.current.value = "";
		}
	};
	const tagOnDelete = index => {
		setTags({
			...tags,
			value: [
				...tags.value.slice(0, index),
				...tags.value.slice(index + 1)
			]
		})
	};
	return (
		<div className="field-container">
			<div className="tags-container">
				{
					tags.value.map((tag, index) =>
						<Tag
							key={index}
							id={index}
							tagText={tag}
							onClose={tagOnDelete}
						/>
					)
				}
			</div>
			<div className="field">
				<FontAwesomeIcon
					icon={iconName}
					color={
						(isError) ?
							'red' :
							STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY
					}
					className="icon"
					style={
						{
							opacity: disabled ?
								0.4 :
								1,
							pointerEvents: disabled ?
								'none' :
								'',
						}
					}
				/>
				<input
					type="text"
					className="inputText"
					name={name}
					id={id}
					onKeyPress={handleTagsInput}
					disabled={disabled}
					placeholder={`${placeholder}${
						required ?
							'*' :
							''
					}`}
					style={
						{
							...styles,
							borderBottomColor: isError ?
								'red' :
								'',
							color: isError ?
								'red' :
								'',
							opacity: disabled ?
								0.4 :
								1,
							pointerEvents: disabled ?
								'none' :
								'',
						}
					}
					ref={tagInputRef}
				/>
			</div>

			{/*{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}*/}
		</div>
	)
};
InputTags.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	checkValue: PropTypes.func,
	isEmpty: PropTypes.bool,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	disabled: PropTypes.bool,
	numberOfTagsAllowed: PropTypes.number
};
InputTags.defaultProps = {
	name: 'inputTags',
	id: 'inputTags',
	placeholder: 'Input Type Tags',
	value: '',
	handleChange: () => console.log('Input Type Tags'),
	required: false,
	handleError: () => console.log('Input Type Tags Error'),
	styles: {},
	checkValue: () => [false, ''],
	isEmpty: false,
	iconName: "tags",
	disabled: false,
	numberOfTagsAllowed: 7
};

//Input Toggle slider
export const InputToggle = props => {
	const {
		name,
		id,
		placeholder,
		value,
		handleChange: handleChangeFromProps,
		required,
		handleError,
		styles,
		checkValue,
		isEmpty,
		iconName,
		disabled
	} = props;

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const toggleRef = useRef(undefined);
	useEffect(
		() => {
			required && handleError(name, isError, errorMessage)
		},
		[isError]
	);
	useEffect(
		() => {
			if (isEmpty) {
				setIsError(true);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			} else {
				setIsError(false);
				setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY);
			}
		},
		[isEmpty]
	);
	const handleChange = (event) => {
		const {
			target: {
				value
			}
		} = event;
		if (require && value === '') {
			required && setIsError(true);
			required && setErrorMessage(ERROR_MESSAGES.REQUIRED_FIELD_EMPTY)
		} else {
			const [isError, errorMessage] = checkValue(value);
			if (isError) {
				setIsError(true);
				setErrorMessage(errorMessage);
			} else {
				setIsError(false);
				setErrorMessage('');
			}
		}
		event.target.value = value === 'off';
		handleChangeFromProps(event);
	};

	return (
		<div className="field-container">
			<div className="label-container">
				<span className="label">
					{
						placeholder
					}
				</span>
				<div className="field toggle">
					<input
						type="checkbox"
						name={name}
						id={id}
						onChange={handleChange}
						value={value ? 'on' : 'off'}
						disabled={disabled}
						style={
							{
								...styles,
								borderBottomColor: isError ?
									'red' :
									'',
								color: isError ?
									'red' :
									'',
								opacity: disabled ?
									0.4 :
									1,
								pointerEvents: disabled ?
									'none' :
									''
							}
						}
						checked={value}
						ref={toggleRef}
					/>
					<span className="slider round" onClick={() => toggleRef.current.click()}></span>
				</div>
			</div>
			{
				isError &&
				<Error
					message={errorMessage}
					styles={
						{
							textAlign: 'right'
						}
					}
				/>
			}
		</div>
	)
};
InputToggle.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.bool,
	handleChange: PropTypes.func,
	required: PropTypes.bool,
	handleError: PropTypes.func,
	styles: PropTypes.object,
	checkValue: PropTypes.func,
	isEmpty: PropTypes.bool,
	iconName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	disabled: PropTypes.bool
};
InputToggle.defaultProps = {
	name: 'inputToggle',
	id: 'inputToggle',
	placeholder: 'Input Type Toggle',
	value: false,
	handleChange: () => console.log('Input Type Toggle'),
	required: false,
	handleError: () => console.log('Input Type Toggle Error'),
	styles: {},
	checkValue: () => [false, ''],
	isEmpty: false,
	iconName: "tags",
	disabled: false
};

//Input type Submit
export const InputSubmit = React.forwardRef((props, ref) => {
	const {
		text,
		handleClick,
		styles,
		isDisabled,
		loader,
		theme
	} = props;
	return (
		<div className="field-container">
			<button
				type="submit"
				className={`inputSubmit body-copy ${theme} ${loader && "submit-loader"}`}
				onClick={handleClick}
				ref={ref}
				style={
					{
						...styles,
						opacity: isDisabled || loader ?
							0.4 :
							1,
						pointerEvents: isDisabled || loader ?
							'none' :
							'',
						color: 'black'
					}
				}
			>
				<span className={"submit-text"}>
					{
						text
					}
				</span>
				<span>
					{
						loader &&
						<Loader
							styles={
								{
									margin: '0 10px'
								}
							}
						/>
					}
				</span>
			</button>
		</div>

	)
});
InputSubmit.propTypes = {
	text: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
	styles: PropTypes.object,
	isDisabled: PropTypes.bool,
	loader: PropTypes.bool,
	theme: PropTypes.oneOf(['main-button', 'secondary-button'])
};
InputSubmit.defaultProps = {
	text: 'Input Type Submit',
	handleClick: () => console.log('Input Type Submit'),
	styles: {},
	isDisabled: false,
	loader: false,
	theme: 'main-button'
};

//Input Fields Component
export const InputFields = (props) => {
	return (
		<div className="inputFields-container" style={{...props.styles}}>
			{
				props.children
			}
		</div>
	)
};
InputFields.propTypes = {
	styles: PropTypes.object
};

/*
*
* <InputFields>
	<InputText
	 name={'sddfs'}
	 id={'sfsaasf'}
	/>
</InputFields>
* */
