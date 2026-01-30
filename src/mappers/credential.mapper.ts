import {CredentialDto} from "../dtos/credential.dto";
import {Credential} from "../models/credential.model";

export function toDto(model: Credential): CredentialDto {
    const dto: CredentialDto = new CredentialDto();

    dto.email = model.email;

    return dto;
}

export function toModel(dto: CredentialDto): Credential {
    const model: Credential = new Credential();

    model.email = dto.email;

    return model;
}