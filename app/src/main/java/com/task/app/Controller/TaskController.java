package com.task.app.Controller;

import com.task.app.Dto.TaskCreateDto;
import com.task.app.Dto.TaskResponseDto;
import com.task.app.Dto.TaskUpdateDto;
import com.task.app.Entity.Task;
import com.task.app.Services.TaskService;
import com.task.app.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;

@Controller
public class TaskController {

    private TaskService taskService;
    private UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping("/tasks")
    public String listTasks(Model model, Principal principal, SecurityContextHolderAwareRequestWrapper request) {
        prepareTasksListModel(model, principal, request);
        model.addAttribute("onlyInProgress", false);
        return "views/tasks";
    }

    @GetMapping("/tasks/in-progress")
    public ResponseEntity<List<TaskResponseDto>> listTasksInProgress() {

    }

    @PostMapping("/task/create")
    public ResponseEntity<TaskResponseDto> createTask( @Valid TaskCreateDto taskCreateDto) {
        TaskCreateDto createdTask = taskService.createTask(taskCreateDto);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }


    @PutMapping("/task/edit/{id}")
    public ResponseEntity<TaskResponseDto> showFilledTaskForm(@Valid TaskUpdateDto model) {
        TaskResponseDto response = taskService.updateTask(model);
        return "forms/task-edit";
    }

    @PostMapping("/task/edit/{id}")
    public String updateTask(@Valid Task task, BindingResult bindingResult, @PathVariable Long id, Model model) {
        if (bindingResult.hasErrors()) {
            return "forms/task-edit";
        }
        taskService.updateTask(id, task);
        return "redirect:/tasks";
    }

    @GetMapping("/task/delete/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "redirect:/tasks";
    }

    @GetMapping("/task/mark-done/{id}")
    public String setTaskCompleted(@PathVariable Long id) {
        taskService.setTaskCompleted(id);
        return "redirect:/tasks";
    }

    @GetMapping("/task/unmark-done/{id}")
    public String setTaskNotCompleted(@PathVariable Long id) {
        taskService.setTaskNotCompleted(id);
        return "redirect:/tasks";
    }

}