package com.task.app.Services;

import com.task.app.Entity.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    User createUser(User user);

    User updateUserRoles(Long userId, Set<Long> roleIds);

    List<User> findAll();

    User getUserByEmail(String email);

    boolean isUserEmailPresent(String email);

    User getUserById(Long userId);

    void deleteUser(Long id);
}