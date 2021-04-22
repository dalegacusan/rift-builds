export interface snackbarControlsInterface {
	snackbarControls: {
		message: string | null;
		shouldOpen: boolean;
		snackbarType: string;
	};
}

export interface ValidationResult {
	message: string | null;
	result: boolean;
}
