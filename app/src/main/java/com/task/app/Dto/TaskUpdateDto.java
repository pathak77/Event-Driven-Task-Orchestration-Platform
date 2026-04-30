package com.task.app.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.task.app.Entity.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import java.util.List;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskUpdateDto {

    @NotNull
            @Min(1)
    Long id;

    @NotEmpty(message = "Task name cannot be empty")
    private String title;

    @NotEmpty(message = "Task description cannot be empty")
    private String description;

    @NotNull(message = "Date cant be null")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    
    @NotNull(message = "Date cant be null")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private Status status;

    private String creatorName;

    private List<User> assignedTo;
}