import {Token} from "../models/token.model";
import {TokenDto} from "../dtos/token.dto";

export function toDto(model: Token): TokenDto {
    const dto: TokenDto = new TokenDto();

    dto.uuid = model.uuid;

    return dto;
}

export function toModel(dto: TokenDto): Token {
    const model: Token = new Token();

    model.uuid = dto.uuid;

    return model;
}