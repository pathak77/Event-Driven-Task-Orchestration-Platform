package com.task.app.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponseDto {

    Long id;
    String title;
    String description;
    Status status;
    LocalDate startDate;
    LocalDate endDate;
}
