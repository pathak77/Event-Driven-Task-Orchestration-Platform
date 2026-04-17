package com.task.app.Dto;

import com.task.app.Entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank
    Long id;

    @NotEmpty(message = "Task name cannot be empty")
    private String name;

    @NotEmpty(message = "Task description cannot be empty")
    private String description;

    @NotNull(message = "Date cant be null")
    private LocalDate startDate;
    
    @NotNull(message = "Date cant be null")
    private LocalDate endDate;

    private Status status;

    private String creatorName;

    private List<User> assignedTo;
}