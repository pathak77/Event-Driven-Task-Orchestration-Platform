package com.task.app.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDto {

    @NotNull
    Long assignedById;

    @NotNull
    Long assignedToId;

    String Description;

    @NotNull
    @Builder.Default()
    LocalDate startDate = LocalDate.now();

    LocalDate endDate;

    int priority;

}
