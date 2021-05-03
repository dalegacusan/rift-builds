export const ServerResponse = (
	isSuccess: boolean,
	isError: boolean,
	errorCode: number,
	errorMessage: string,
	responseData: any
) => {
	return {
		success: false,
		error: {
			code: 105,
			type: 'https_access_restricted',
			message:
				'Access Restricted - Your current subscription plan does not support HTTPS encryption.',
		},
	};
};
