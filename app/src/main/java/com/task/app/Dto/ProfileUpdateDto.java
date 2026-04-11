package com.task.app.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
class ProfileUpdateDto{

    String bio;

    String avatarUrl;

    CharSequence phoneNumber;


}
