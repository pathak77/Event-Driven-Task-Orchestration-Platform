package com.task.app.Services;

import com.task.app.Entity.Task;
import com.task.app.Entity.User;
import com.task.app.GlobalExceptions.BadRequestException;
import com.task.app.Repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepo taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepo taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void createTask(Task task) {
        taskRepository.save(task);
    }

    @Override
    public void updateTask(Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(updatedTask.getId());
        if( optionalTask.isEmpty() ) {
            throw new BadRequestException("Task not found");
        }

        Task task = optionalTask.get();

        task.setName(updatedTask.getName());
        task.setDescription(updatedTask.getDescription());
        task.setDate(updatedTask.getDate());
        taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        if( !taskRepository.existById(id) )
            throw new BadRequestException("Task not found");

        taskRepository.deleteById(id);
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> findByOwnerOrderByDateDesc(User user) {
        return taskRepository.findByOwnerOrderByDateDesc(user);
    }

    @Override
    public void setTaskCompleted(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if( optionalTask.isEmpty() )
            throw new BadRequestException("Task not found");

        Task task = optionalTask.get();
        task.setCompleted(true);
        taskRepository.save(task);
    }

    @Override
    public void setTaskNotCompleted(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if( optionalTask.isEmpty() )
            throw new BadRequestException("Task not found");

        Task task = optionalTask.get();
        task.setCompleted(false);
        taskRepository.save(task);
    }

    @Override
    public List<Task> findFreeTasks() {
        return taskRepository.findAll()
                .stream()
                .filter(task -> task.getOwner() == null && !task.isCompleted())
                .collect(Collectors.toList());

    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Override
    public void assignTaskToUser(Task task, User user) {
        task.setOwner(user);
        taskRepository.save(task);
    }

    @Override
    public void unassignTask(Task task) {
        task.setOwner(null);
        taskRepository.save(task);
    }

}