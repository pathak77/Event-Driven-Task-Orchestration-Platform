package com.task.app.Controller;


import com.task.app.Dto.ProfileResponseDto;
import com.task.app.Dto.ProfileUpdateDto;
import com.task.app.Dto.UserDto;
import com.task.app.Entity.User;
import com.task.app.Security.UserPrincipal;
import com.task.app.Services.UserService;
import com.task.app.Services.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;

    @Autowired
    public ProfileController(UserServiceImpl userService) {
        this.userService = userService;
    }


    @GetMapping({"/{id}", "/"})
    public ResponseEntity<ProfileResponseDto> getProfile(
            @PathVariable(required = false) Long id,
            @AuthenticationPrincipal UserPrincipal principal) {

        Long currentUserId;

        if (id != null) {
            currentUserId = id;
        } else if (principal != null) {
            currentUserId = Long.valueOf(principal.id());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userService.getUserById(currentUserId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        ProfileResponseDto response = new ProfileResponseDto();
        response.setUsername(user.getUsername());
        response.setAvatarUrl(user.getPhoto());
        response.setBio(user.getBio());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setEmail(user.getEmail());

        return ResponseEntity.ok(response);
    }


    @PutMapping({"/{id}"})
    public ResponseEntity<ProfileResponseDto> updateProfile(
            @PathVariable(required = false) Long id,
            @Valid @RequestBody ProfileUpdateDto updateDto) {

        User updatedUser = userService.updateProfile(id, updateDto);


        ProfileResponseDto response = new ProfileResponseDto();
        response.setUsername(updatedUser.getUsername());
        response.setAvatarUrl(updatedUser.getPhoto());
        response.setBio(updatedUser.getBio());
        response.setPhoneNumber(updatedUser.getPhoneNumber());
        response.setEmail(updatedUser.getEmail());

        return ResponseEntity.ok(response);
    }
}


