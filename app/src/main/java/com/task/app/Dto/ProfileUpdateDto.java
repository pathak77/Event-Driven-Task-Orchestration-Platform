package com.task.app.Dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdateDto{

    String bio;

    String avatarUrl;

    String phoneNumber;

    @Email
            String email;
}
