package com.task.app.Controller;

import com.task.app.Dto.TaskCreateDto;
import com.task.app.Dto.TaskResponseDto;
import com.task.app.Dto.TaskUpdateDto;
import com.task.app.Entity.Task;
import com.task.app.Mapper.TaskMapper;
import com.task.app.Security.UserPrincipal;
import com.task.app.Services.TaskService;
import com.task.app.Services.TaskServiceImpl;
import com.task.app.Services.UserService;
import com.task.app.Services.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    @Autowired
    public TaskController(TaskServiceImpl taskService, TaskMapper taskMapper) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }


    @GetMapping("/tasks")
    public ResponseEntity<List<TaskResponseDto>> listTasks() {
        List<TaskResponseDto> tasks = taskService.findAll().stream()
                .map(taskMapper::toResponseDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    // 2. Get only in-progress tasks
    @GetMapping("/tasks/in-progress")
    public ResponseEntity<List<TaskResponseDto>> listTasksInProgress() {
        List<Task> taskList = taskService.findAllComplete(false);

        List<TaskResponseDto> taskResponseDtoList = taskList.stream()
                .map(taskMapper::toResponseDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(taskResponseDtoList, HttpStatus.OK);
    }

    // 3. Create a new task
    @PostMapping("/task/create")
    public ResponseEntity<TaskResponseDto> createTask(@Valid @RequestBody TaskCreateDto taskCreateDto) {
        // Map DTO to Entity
        Task task = taskMapper.toEntity(taskCreateDto);

        // Save using Service
        taskService.createTask(task);

        // Return mapped Response DTO
        return new ResponseEntity<>(taskMapper.toResponseDto(task), HttpStatus.CREATED);
    }

    // 4. Get a specific task by ID (Replaces the "showFilledTaskForm" concept)
    @GetMapping("/task/{id}")
    public ResponseEntity<TaskResponseDto> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(taskMapper.toResponseDto(task), HttpStatus.OK);
    }

    // 5. Update an existing task
    @PutMapping("/task/edit/{id}")
    public ResponseEntity<TaskResponseDto> updateTask(@PathVariable Long id, @Valid @RequestBody TaskUpdateDto taskUpdateDto) {
        Task existingTask = taskService.getTaskById(id);
        if (existingTask == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Map updates from DTO onto the existing entity
        taskMapper.updateEntityFromDto(taskUpdateDto, existingTask);
        taskService.updateTask(existingTask);

        return new ResponseEntity<>(taskMapper.toResponseDto(existingTask), HttpStatus.OK);
    }

    // 6. Delete a task
    @DeleteMapping("/task/delete/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Long requestingUserId = Long.parseLong(currentUser.id());
        taskService.deleteTask(id, requestingUserId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 7. Mark task as done
    @PutMapping("/task/mark-done/{id}")
    public ResponseEntity<Void> setTaskCompleted(@PathVariable Long id) {
        taskService.setTaskCompleted(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 8. Unmark task
    @PutMapping("/task/unmark-done/{id}")
    public ResponseEntity<Void> setTaskNotCompleted(@PathVariable Long id) {
        taskService.setTaskNotCompleted(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}