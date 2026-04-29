package com.task.app.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskCreateDto {
    @NotBlank
    String title;

    String description;

    @NotNull
    LocalDate startDate;

    LocalDateTime endDate;
}
