package com.task.app.Services;

import com.task.app.Entity.Role;
import com.task.app.Entity.Task;
import com.task.app.Entity.User;
import com.task.app.GlobalExceptions.BadRequestException;
import com.task.app.Repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepository;
    private final TaskServiceImpl taskService;
    private final RoleServiceImpl roleService;

    @Autowired
    public UserServiceImpl(UserRepo userRepository,
                           TaskServiceImpl taskService,
                           RoleServiceImpl roleService) {
        this.userRepository = userRepository;
        this.taskService = taskService;
        this.roleService = roleService;
    }

    @Override
    public User createUser(User user) {

    }

    @Transactional
    public User updateUserRoles(Long userId, Set<Long> roleIds) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Role> newRoles = roleService.findAllById(roleIds.stream().toList());

        user.getRoles().clear();
        user.getRoles().addAll(newRoles);

        userRepository.save(user);

        return user;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean isUserEmailPresent(String email) {
        return userRepository.findByEmail(email) != null;
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty())
            throw new BadRequestException("User doesn't exist");

        User presentUser = user.get();
        List<Task> taskList = taskService.findByOwnerOrderByDateDesc(presentUser);
            taskList.stream().map(task -> {
            task.setOwner(null);
            return task;}
            );
    }
}