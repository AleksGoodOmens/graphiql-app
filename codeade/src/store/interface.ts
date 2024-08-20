export interface IForms {
	controlledForm: IValues;
	uncontrolledForm: IValues;
	showPassword: boolean;
}

export interface IValues {
	name: string;
	age: number | undefined;
	email: string;
	password: string;
	confirmPassword: string;
	gender: 'male' | 'female' | '';
	termsConditions: boolean;
	picture?: FileList;
	picture64?: string;
	country: string;
}

export interface ICountriesState extends ICountries {
	isLoading: boolean;
	isError: string;
}

export interface ICountries {
	countries: ICountry[];
}

export interface ICountry {
	flags: IFlags;
	name: IName;
}

export interface IFlags {
	png: string;
	svg: string;
	alt: string;
}

export interface IName {
	common: string;
	official: string;
}
