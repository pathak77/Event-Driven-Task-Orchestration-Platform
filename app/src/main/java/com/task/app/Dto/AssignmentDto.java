package com.task.app.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;

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
    Date startDate = new Date();

    Date endDate;

    int priority;

}
