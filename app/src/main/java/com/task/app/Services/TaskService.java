package com.task.app.Services;

import com.task.app.Dto.TaskResponseDto;
import com.task.app.Entity.Task;
import com.task.app.Entity.User;

import java.util.List;

public interface TaskService {

    void createTask(Task task);

    void updateTask(Task task);

    void deleteTask(Long taskId, Long requestingUserId);

    List<Task> findAll();

    List<Task> findAllComplete(boolean data);

    List<Task> findByOwnerOrderByDateDesc(User user);

    void setTaskCompleted(Long id);

    void setTaskNotCompleted(Long id);

    List<Task> findFreeTasks();

    Task getTaskById(Long taskId);

    void assignTaskToUser(Task task, User user);

    void unassignTask(Long taskId, Long targetUserId, Long requestingUserId);

    void assignTask(Long taskId, Long targetUserId, Long requestingUserId);

    List<TaskResponseDto> getTasksAssignedToUser(Long userId);
}