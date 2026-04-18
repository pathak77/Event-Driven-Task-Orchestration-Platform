package com.task.app.Controller;


import com.task.app.Dto.ProfileResponseDto;
import com.task.app.Dto.ProfileUpdateDto;
import com.task.app.Dto.UserDto;
import com.task.app.Entity.User;
import com.task.app.Services.UserService;
import com.task.app.Services.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;

    @Autowired
    public ProfileController(UserServiceImpl userService) {
        this.userService = userService;
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponseDto> getProfile(@PathVariable Long id) {
        User user = userService.getUserById(id);

        ProfileResponseDto response = new ProfileResponseDto();
        response.setUsername(user.getName());
        response.setAvatarUrl(user.getPhoto());


        return ResponseEntity.ok(response);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProfileResponseDto> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody ProfileUpdateDto updateDto) {

        User updatedUser = userService.updateProfile(id, updateDto);


        ProfileResponseDto response = new ProfileResponseDto();
        response.setUsername(updatedUser.getName());
        response.setAvatarUrl(updatedUser.getPhoto());

        return ResponseEntity.ok(response);
    }
}


