import React, { useEffect, useRef, RefObject } from 'react';
import { ReCaptcha } from '../../../../shared/config/config';
import ReCAPTCHA from 'react-google-recaptcha';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../shared/store/actions';

const ReCaptchaComponent = (props: ReCaptchaComponentProps) => {
	const { resetCaptcha } = props;
	// RECAPTCHA Props
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		setRecaptchRef: (recaptchaRef: RefObject<ReCAPTCHA | null>) =>
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

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector> & {
	resetCaptcha: () => void;
};

type ReCaptchaComponentProps = PropsFromRedux;

export default connector(ReCaptchaComponent);
