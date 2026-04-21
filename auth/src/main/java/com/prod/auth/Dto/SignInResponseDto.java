package com.prod.auth.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignInResponseDto {
    String username;
    String email;
    String message;
}
