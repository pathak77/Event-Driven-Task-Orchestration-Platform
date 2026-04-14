package com.task.app.Services;

import com.task.app.Entity.Task;
import com.task.app.Entity.User;

import java.util.List;

public interface TaskService {

    void createTask(Task task);

    void updateTask(Task task);

    void deleteTask(Long id);

    List<Task> findAll();

    List<Task> findAllComplete(boolean data);

    List<Task> findByOwnerOrderByDateDesc(User user);

    void setTaskCompleted(Long id);

    void setTaskNotCompleted(Long id);

    List<Task> findFreeTasks();

    Task getTaskById(Long taskId);

    void assignTaskToUser(Task task, User user);

    void unassignTask(Task task);
}