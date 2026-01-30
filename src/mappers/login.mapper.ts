import {Login} from "../models/login.model";
import {LoginDto} from "../dtos/login.dto";

export function toDto(model: Login): LoginDto {
    const dto: LoginDto = new LoginDto();

    dto.email = model.email;
    dto.password = model.password;

    return dto;
}

export function toModel(dto: LoginDto): Login {
    const model: Login = new Login();

    model.email = dto.email;
    model.password = dto.password;

    return model;
}