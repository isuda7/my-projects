import i18n from 'i18next';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^[0-9 ()+-]+$/;
const numberRegex = /^[0-9]+$/;

export const emailValidator = (value: string): string | undefined =>
  emailRegex.test(value)
    ? undefined
    : "You have entered an invalid email address!";
export const requiredValidator = (value: string): string | undefined =>
  value ? undefined : i18n.t('common.field_required_error');
  //value ? undefined : "This field is required";
export const phoneValidator = (value: string): string | undefined =>
  value && phoneRegex.test(value)
    ? undefined
    : "Please enter valid phone number.";
export const biographyValidator = (value: string): string | undefined =>
  value.length >= 50
    ? undefined
    : "Biography must be at least 50 characters long.";
export const stringLengthValidator = (value: string, length: number): string | undefined =>
    value.length === length
        ? undefined
        : `Must be ${length} characters long.`;
export const stringMinLengthValidator = (value: string, minLength: number): string | undefined =>
  value.length >= minLength
	? undefined
	: `Must be at least ${minLength} characters long.`;
export const numberValidator = (value: string): string | undefined =>
  value && numberRegex.test(value)
	? undefined
	: "Please enter only number.";
export const stringLengthMinMaxValidator = (value: string | null | undefined, options: { min?: number, max?: number}): string | undefined => {
  if(value === null || value === undefined) return undefined;
  
  if((options.min && options.max) && ((value.length <= options.min) || (value.length > options.max))) {
    return `최소 ${options.min}글자, 최대 ${options.max}글자까지 입력 할 수 있습니다.`
  }
  else if(options.max && value.length > options.max) {
    return `최대 ${options.max}글자까지 입력 할 수 있습니다.`
  }
  else if(options.min && value.length <= options.min) {
    return `최소 ${options.min}글자 이상 입력해야 합니다.`
  }
}
