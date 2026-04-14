package com.task.app.Controller;


import com.task.app.Services.TaskService;
import com.task.app.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class AssignController {

        private final UserService userService;
        private final TaskService taskService;

        @Autowired
        public AssignController(UserService userService, TaskService taskService) {
            this.userService = userService;
            this.taskService = taskService;
        }


        @GetMapping("/assignment")
        public String showAssigment() {

        }


        @GetMapping("/assignment/{userId}")
        public String showUserAssigmentForm(@PathVariable Long userId) {

        }


        @GetMapping("/assignment/assign/{userId}/{taskId}")
        public String assignTaskToUser(@PathVariable Long userId, @PathVariable Long taskId) {

        }


        @GetMapping("/assignment/unassign/{userId}/{taskId}")
        public String unassignTaskFromUser(@PathVariable Long userId, @PathVariable Long taskId) {

        }

}