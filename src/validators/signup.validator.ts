import {SignupDto} from "../dtos/signup.dto";
import {EMAIL_REGEX, notExists, PASSWORD_REGEX} from "../utils/validator.utils";
import {isEmpty, isMaxLength, isMinMaxLength, matchesRegex} from "../utils/string.utils";
import {ValidationError} from "../errors/validation.error";

export function validate(dto: SignupDto): void {
    if (
        notExists(dto) ||
        notExists(dto.email) ||
        notExists(dto.password) ||
        notExists(dto.displayName) ||
        isEmpty(dto.email) ||
        isEmpty(dto.password) ||
        isEmpty(dto.displayName) ||
        isMaxLength(dto.email, 255) ||
        isMinMaxLength(dto.password, 8, 16) ||
        isMinMaxLength(dto.displayName, 3, 16) ||
        !matchesRegex(dto.email, EMAIL_REGEX) ||
        !matchesRegex(dto.password, PASSWORD_REGEX) ||
        !matchesRegex(dto.displayName, PASSWORD_REGEX)
    ) {
        throw new ValidationError();
    }
}