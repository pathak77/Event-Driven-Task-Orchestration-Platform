 package com.prod.auth.Dto;

import com.prod.auth.Entity.Authority;
import lombok.Builder;

import java.util.List;

 @Builder
public class LoginResponseDto {

    public long loginId;
    public String token;
     List<Authority> authorityList;
}
