import React, { useState, useEffect, useRef } from 'react';
import { ReCaptcha } from '../../../../../shared/constants/constants';
import ReCAPTCHA from 'react-google-recaptcha';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../store/actions';

// Types
import { RootState } from '../../../../../shared/constants/interfaces';

const ReCaptchaComponent = (props: ReCaptchaComponentProps) => {
	const { resetCaptcha } = props;
	// Validation Props
	const { recaptcha } = props;
	const { recaptchaRef, recaptchaToken } = recaptcha;
	const { setRecaptchRef, setRecaptchaToken } = props;

	// ===== ReCaptcha ===== //
	let ref = useRef<ReCAPTCHA | null>(null);

	const recaptchaHandleChange = (value: string | null) => {
		setRecaptchaToken(value);
	};

	useEffect(() => {
		setRecaptchRef(ref);
	}, []);

	return (
		<ReCAPTCHA
			ref={(r) => (ref.current = r)}
			sitekey={ReCaptcha.PUBLIC_KEY!} // Always has a value hence !
			onChange={recaptchaHandleChange}
			onExpired={() => resetCaptcha()}
		/>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		recaptcha: state.recaptcha,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setRecaptchRef: (recaptchaRef: any) =>
			dispatch({
				type: actionTypes.RECAPTCHA_SET_REF,
				data: recaptchaRef,
			}),
		setRecaptchaToken: (recaptchaToken: string | null) =>
			dispatch({
				type: actionTypes.RECAPTCHA_SET_TOKEN,
				data: recaptchaToken,
			}),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector> & {
	resetCaptcha: () => void;
};

type ReCaptchaComponentProps = PropsFromRedux;

export default connector(ReCaptchaComponent);
