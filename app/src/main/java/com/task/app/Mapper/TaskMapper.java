package com.task.app.Mapper;

import com.task.app.Entity.Task;
import com.task.app.Dto.TaskResponseDto;
import com.task.app.Dto.TaskCreateDto;
import com.task.app.Dto.TaskUpdateDto;
import com.task.app.Dto.Status;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;

import com.task.app.Dto.UserDto;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class TaskMapper {


    public TaskResponseDto toResponseDto(Task task) {
        if (task == null) return null;

        return TaskResponseDto.builder()
    .id(task.getId())
    .title(task.getName())
    .description(task.getDescription())
    .status(task.isCompleted() ? Status.COMPLETED : Status.IN_PROGRESS)
    .startDate(task.getStartDate())
    .endDate(task.getEndDate()) 
    .creatorName(task.getCreatorName())
    .assignedUsers(task.getAssignedUsers() == null ? Collections.emptyList() :
        task.getAssignedUsers().stream()
            .map(user -> UserDto.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .build())
            .collect(Collectors.toList()))
    .build();
    }


    public Task toEntity(TaskCreateDto dto) {
        if (dto == null) return null;

        return Task.builder()
                .name(dto.getTitle())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .isCompleted(false)
                .build();
    }

    public void updateEntityFromDto(TaskUpdateDto dto, Task task) {
        if (dto == null || task == null) return;

        task.setName(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStartDate(dto.getStartDate());
        task.setEndDate(dto.getEndDate());
        task.setCreatorName(dto.getCreatorName());

        if (dto.getStatus() != null) {
            task.setCompleted(dto.getStatus() == Status.COMPLETED);
        }

    }
}