import {SignupDto} from "../dtos/signup.dto";
import {Signup} from "../models/signup.model";

export function toDto(model: Signup): SignupDto {
    const dto: SignupDto = new SignupDto();

    dto.email = model.email;
    dto.password = model.password;
    dto.displayName = model.displayName;

    return dto;
}

export function toModel(dto: SignupDto): Signup {
    const model: Signup = new Signup();

    model.email = dto.email;
    model.password = dto.password;
    model.displayName = dto.displayName;

    return model;
}