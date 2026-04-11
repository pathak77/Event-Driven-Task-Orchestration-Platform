package com.task.app.Dto;


import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponseDto{
    String username;

    String bio;

    CharSequence avatarUrl;

    @Size(min = 10, max = 10)
    int phoneNumber;
}

