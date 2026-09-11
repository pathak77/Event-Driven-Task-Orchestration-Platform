package com.task.app.Services;

import com.task.app.Dto.ProfileUpdateDto;
import com.task.app.Dto.Authority;
import com.task.app.Dto.UserDto;
import com.task.app.Entity.Role;
import com.task.app.Entity.Task;
import com.task.app.Entity.User;
import com.task.app.GlobalExceptions.BadRequestException;
import com.task.app.Repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepository;
    private final TaskService taskService;
    private final RoleService roleService;

    @Autowired
    public UserServiceImpl(UserRepo userRepository,
                           TaskServiceImpl taskService,
                           RoleServiceImpl roleService) {
        this.userRepository = userRepository;
        this.taskService = taskService;
        this.roleService = roleService;
    }

    @Override
    @Transactional
    public User createUser(UserDto userDto) {
        User user = User.builder()
                .userId(userDto.getUserId())
                .username(userDto.getUsername())
                .build();

        if( userRepository.existsById(userDto.getUserId()) ||
            userRepository.existsByUsername(userDto.getUsername())) {
            throw new BadRequestException("User already exists");
        }

        userRepository.upsertUser(userDto.getUserId(), userDto.getUsername());

        return (user);
    }

    @Override
    @Transactional
    public void syncUserFromGateway(UserDto userDto) {

        try {
            System.out.println("user received with " + userDto.getUserId() + " with user name " + userDto.getUsername());
            userRepository.upsertUser(userDto.getUserId(), userDto.getUsername());

        } catch (DataIntegrityViolationException e) {

        }
    }




    @Override
    public User updateProfile(Long id, ProfileUpdateDto updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String email = (updateDto.getEmail() != null && !updateDto.getEmail().isBlank()) ? updateDto.getEmail() : null;
        String phone = (updateDto.getPhoneNumber() != null && !updateDto.getPhoneNumber().isEmpty()) ? updateDto.getPhoneNumber() : null;

        Optional<User> existingUser = Optional.empty();
        if (email != null || phone != null) {
            existingUser = userRepository.findByEmailOrPhoneNumber(email, phone);
        }

        if (existingUser.isPresent() && !existingUser.get().getUserId().equals(id)) {
            throw new BadRequestException("User with same email or phone exists");
        }

        // Update fields if they are provided
        if (updateDto.getUsername() != null && !updateDto.getUsername().isBlank()) {
            user.setUsername(updateDto.getUsername());
        }
        if (updateDto.getBio() != null) {
            user.setBio(updateDto.getBio());
        }
        if (updateDto.getAvatarUrl() != null) {
            user.setPhoto(updateDto.getAvatarUrl());
        }
        if (updateDto.getPhoneNumber() != null) {
            user.setPhoneNumber(updateDto.getPhoneNumber());
        }
        if (updateDto.getEmail() != null && !updateDto.getEmail().isBlank()) {
            user.setEmail(updateDto.getEmail());
        }

        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User updateUserRoles(Long userId, Set<Authority> newAuthorities) {
        // 1. Fetch the user (EAGER fetch handles roles, but findById is fine here)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<Role> newRoles = roleService.findByNameIn(newAuthorities);

        user.setRoles(newRoles);

        return user;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmailOrPhoneNumber(email, null).orElse(null);
    }

    @Override
    public boolean isUserEmailPresent(String email) {
        return userRepository.existsByEmail(email);
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


    @Override
    public boolean hasRole(Long userId, Authority roleName) {
        return userRepository.existsByUserIdAndRoles_Name(userId, roleName);
    }
}