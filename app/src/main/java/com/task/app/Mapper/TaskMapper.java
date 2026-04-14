package com.task.app.Mapper;

import com.task.app.Entity.Task;
import com.task.app.Dto.TaskResponseDto;
import com.task.app.Dto.TaskCreateDto;
import com.task.app.Dto.TaskUpdateDto;
import com.task.app.Dto.Status;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.util.Date;

@Component
public class TaskMapper {


    public TaskResponseDto toResponseDto(Task task) {
        if (task == null) return null;

        return TaskResponseDto.builder()
                .id(task.getId())
                .title(task.getName())
                .description(task.getDescription())
                .status(task.isCompleted() ? Status.COMPLETED : Status.IN_PROGRESS)
                .startDate(null)
                .endDate(task.getDate())
                .build();
    }


    public Task toEntity(TaskCreateDto dto) {
        if (dto == null) return null;


        Date endDate = dto.getEndDate() != null
                ? Date.from(dto.getEndDate().atZone(ZoneId.systemDefault()).toInstant())
                : null;

        return Task.builder()
                .name(dto.getTitle())
                .description(dto.getDescription())
                .date(endDate)
                .isCompleted(false)
                .build();
    }

    public void updateEntityFromDto(TaskUpdateDto dto, Task task) {
        if (dto == null || task == null) return;

        task.setName(dto.getName());
        task.setDescription(dto.getDescription());
        task.setDate(dto.getEndDate());
        task.setCreatorName(dto.getCreatorName());

        if (dto.getStatus() != null) {
            task.setCompleted(dto.getStatus() == Status.COMPLETED);
        }

    }
}