import { RootState } from '..'

const controlledSelector = (state: RootState) => state.forms.controlledForm
const unControlledSelector = (state: RootState) => state.forms.uncontrolledForm
const showPasswordSelector = (state: RootState) => state.forms.showPassword
const countriesSelector = (state: RootState) => state.countries

export {
	controlledSelector,
	unControlledSelector,
	showPasswordSelector,
	countriesSelector,
}
