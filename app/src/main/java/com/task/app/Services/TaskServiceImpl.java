package com.task.app.Services;

import com.task.app.Dto.TaskResponseDto;
import com.task.app.Entity.Task;
import com.task.app.Entity.User;
import com.task.app.GlobalExceptions.BadRequestException;
import com.task.app.Mapper.TaskMapper;
import com.task.app.Repository.TaskRepo;
import com.task.app.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepo taskRepository;
    private final UserRepo userRepository;
    private final TaskMapper taskmapper;
    @Autowired
    public TaskServiceImpl(TaskRepo taskRepository,
                           UserRepo userRepository,
                           TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.taskmapper = taskMapper;
    }

    @Override
    public void createTask(Task task) {
        taskRepository.save(task);
    }

    @Override
    public void updateTask(Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(updatedTask.getId());
        if(optionalTask.isEmpty()) {
            throw new BadRequestException("Task not found");
        }

        Task task = optionalTask.get();

        task.setName(updatedTask.getName());
        task.setDescription(updatedTask.getDescription());
        task.setDate(updatedTask.getDate());
        taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long taskId, Long requestingUserId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new BadRequestException("Task not found"));


        if (task.getOwner() == null || !task.getOwner().getUserId().equals(requestingUserId)) {
            throw new BadRequestException("Unauthorized: Only the owner can delete this task.");
        }

        taskRepository.deleteById(taskId);
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> findAllComplete(boolean data) {
        return taskRepository.findByIsCompleted(data);
    }

    @Override
    public List<Task> findByOwnerOrderByDateDesc(User user) {
        return taskRepository.findByOwnerOrderByDateDesc(user);
    }

    @Override
    public void setTaskCompleted(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if(optionalTask.isEmpty())
            throw new BadRequestException("Task not found");

        Task task = optionalTask.get();
        task.setCompleted(true);
        taskRepository.save(task);
    }

    @Override
    public void setTaskNotCompleted(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if(optionalTask.isEmpty())
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
    public void unassignTask(Long taskId, Long targetUserId, Long requestingUserId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new BadRequestException("Task not found"));

        if (task.getOwner() == null || !task.getOwner().getUserId().equals(requestingUserId)) {
            throw new BadRequestException("Unauthorized: Only the owner can unassign users from this task.");
        }

        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (targetUser.getAssignedTasks().contains(task)) {
            targetUser.getAssignedTasks().remove(task);
            userRepository.save(targetUser);
        }
    }

    @Override
    public void assignTask(Long taskId, Long targetUserId, Long requestingUserId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new BadRequestException("Task not found"));

        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (!targetUser.getAssignedTasks().contains(task)) {
            targetUser.getAssignedTasks().add(task);
            userRepository.save(targetUser);
        }
    }

    @Override
    public List<TaskResponseDto> getTasksAssignedToUser(Long userId) {

        List<Task> userTask = taskRepository.findByAssignedUsers(userId);

        return userTask.stream().map(taskmapper::toResponseDto).toList();
    }
}