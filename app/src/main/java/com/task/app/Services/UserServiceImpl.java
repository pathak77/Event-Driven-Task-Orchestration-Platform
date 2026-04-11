package com.task.app.Services;

import com.task.app.Entity.Role;
import com.task.app.Entity.User;
import com.task.app.Repository.RoleRepo;
import com.task.app.Repository.TaskRepo;
import com.task.app.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private static final String ADMIN = "ADMIN";
    private static final String USER = "USER";

    private UserRepo userRepository;
    private TaskRepo taskRepository;
    private RoleRepo roleRepository;


    @Autowired
    public UserServiceImpl(UserRepo userRepository,
                           TaskRepo taskRepository,
                           RoleRepo roleRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User createUser(User user) {
        return new User();
    }

    @Override
    public User changeRoleToAdmin(User user) {
        Role adminRole = roleRepository.findByRole(ADMIN);
        user.setRoles(new ArrayList<>(Collections.singletonList(adminRole)));
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return List.of();
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
        User user = userRepository.getOne(id);
        user.getTasksOwned().forEach(task -> task.setOwner(null));
        userRepository.delete(user);
    }
}