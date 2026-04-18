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
    public User createUser(UserDto userDto) {
        User user = User.builder()
                .id(userDto.getUserId())
                .name(userDto.getUsername())
                .build();

        if( userRepository.existsById(userDto.getUserId()) ||
            userRepository.existsByUsername(userDto.getUsername())) {
            throw new BadRequestException("User already exists");
        }

        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void syncUserFromGateway(UserDto userDto) {
        if (userRepository.existsById(userDto.getUserId())) {
            return;
        }

        User user = User.builder()
                .id(userDto.getUserId())
                .name(userDto.getUsername())
                .build();

        try {
            userRepository.save(user);
        } catch (DataIntegrityViolationException e) {

        }
    }


    @Override
    public User updateProfile(Long id,  ProfileUpdateDto updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<User> existingUser = userRepository.findByEmailOrPhoneNumber( (updateDto.getEmail().isBlank()) ? null : updateDto.getEmail(),
                (updateDto.getPhoneNumber().isEmpty()) ? null : updateDto.getPhoneNumber() );

        if(existingUser.isPresent()) {
            if(existingUser.get().getId().equals(id)) {
                user.setBio( (updateDto.getBio().isEmpty()) ? null : updateDto.getBio());
                user.setPhoto( (updateDto.getAvatarUrl().isEmpty()) ? null : updateDto.getAvatarUrl());
                user.setPhoneNumber( (updateDto.getPhoneNumber().isEmpty()) ? null : updateDto.getPhoneNumber() );
                user.setEmail( (updateDto.getEmail().isBlank()) ? null : updateDto.getEmail() );
            }
            else throw new BadRequestException("User with same email or phone exists");
        }

        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User updateUserRoles(Long userId, Set<Authority> roleNames) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));


        Set<Role> roles = roleService.findAllById(roleNames);

        if (roles.size() != roleNames.size()) {
            throw new IllegalArgumentException("One or more roles were not found in the database");
        }


        user.getRoles().clear();
        user.getRoles().addAll(roles);

        return userRepository.save(user);
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
        return userRepository.existsByUserIdAndAuthority(userId, roleName);
    }
}