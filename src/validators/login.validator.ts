import {EMAIL_REGEX, notExists, PASSWORD_REGEX} from "../utils/validator.utils";
import {LoginDto} from "../dtos/login.dto";
import {isEmpty, isMaxLength, matchesRegex} from "../utils/string.utils";
import {ValidationError} from "../errors/validation.error";

export function validate(dto: LoginDto): void {
    if (
        notExists(dto) ||
        notExists(dto.email) ||
        notExists(dto.password) ||
        isEmpty(dto.email) ||
        isEmpty(dto.password) ||
        isMaxLength(dto.email, 255) ||
        isMaxLength(dto.password, 16) ||
        !matchesRegex(dto.email, EMAIL_REGEX) ||
        !matchesRegex(dto.password, PASSWORD_REGEX)
    ) {
        throw new ValidationError();
    }
}