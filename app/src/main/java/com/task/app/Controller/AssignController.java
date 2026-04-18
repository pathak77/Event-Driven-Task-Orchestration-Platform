package com.task.app.Controller;

import com.task.app.Dto.TaskResponseDto;
import com.task.app.Security.UserPrincipal;
import com.task.app.Services.TaskService;
import com.task.app.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/assignments")
public class AssignController {

        private final UserService userService;
        private final TaskService taskService;

        public AssignController(UserService userService, TaskService taskService) {
                this.userService = userService;
                this.taskService = taskService;
        }


        @GetMapping("/me")
        public ResponseEntity<List<TaskResponseDto>> getMyAssignments(
                @AuthenticationPrincipal UserPrincipal currentUser) {

                Long myId = Long.parseLong(currentUser.id());
                List<TaskResponseDto> myTasks = taskService.getTasksAssignedToUser(myId);

                return ResponseEntity.ok(myTasks);
        }


        @GetMapping("/{userId}")
        public ResponseEntity<List<TaskResponseDto>> getUserAssignments(@PathVariable Long userId) {

                List<TaskResponseDto> userTasks = taskService.getTasksAssignedToUser(userId);

                return ResponseEntity.ok(userTasks);
        }


        @PostMapping("/{taskId}/assign-to/{targetUserId}")
        public ResponseEntity<String> assignTaskToUser(
                @PathVariable Long taskId,
                @PathVariable Long targetUserId,
                @AuthenticationPrincipal UserPrincipal currentUser) {

                Long requestingUserId = Long.parseLong(currentUser.id());

                taskService.assignTask(taskId, targetUserId, requestingUserId);

                return ResponseEntity.ok("Task successfully assigned.");
        }


        @DeleteMapping("/{taskId}/unassign/{targetUserId}")
        public ResponseEntity<String> unassignTaskFromUser(
                @PathVariable Long taskId,
                @PathVariable Long targetUserId,
                @AuthenticationPrincipal UserPrincipal currentUser) {

                Long requestingUserId = Long.parseLong(currentUser.id());

                taskService.unassignTask(taskId, targetUserId, requestingUserId);

                return ResponseEntity.ok("Task successfully unassigned.");
        }
}