package com.task.app.Dto;

import com.task.app.Entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
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
    private Date startDate;
    
    @NotNull(message = "Date cant be null")
    private Date endDate;

    private Status status;

    private String creatorName;

    private List<User> assignedTo;
}