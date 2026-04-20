package com.task.app.Controller;

import com.task.app.Dto.Authority;
import com.task.app.Entity.Role;
import com.task.app.Entity.User;
import com.task.app.Security.UserPrincipal;
import com.task.app.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 1. Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    // 2. Get a specific user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }

    // 3. Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // 4. Change User Authority (Restricted to ADMIN)
    @PutMapping("/{userId}/roles")
    public ResponseEntity<String> updateUserRoles(
            @PathVariable Long userId,
            @RequestBody Set<Authority> roles,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Long requestingUserId = Long.parseLong(currentUser.id());

        boolean isAdmin = userService.hasRole(requestingUserId, Authority.ROLE_ADMIN);

        if (!isAdmin) {
            return new ResponseEntity<>("Forbidden: Only administrators can modify roles.", HttpStatus.FORBIDDEN);
        }

        // If authorized, proceed with the update
        userService.updateUserRoles(userId, roles);

        return ResponseEntity.ok("User roles updated successfully.");
    }
}