package com.task.app.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponseDto {

    Long id;
    String title;
    String description;
    Status status;
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate endDate;
    String creatorName;
    List<UserDto> assignedUsers;
}
