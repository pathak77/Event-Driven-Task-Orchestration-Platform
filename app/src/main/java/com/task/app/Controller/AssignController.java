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
        public String showAssigmentForm(Model model) {
            model.addAttribute("users", userService.findAllUsers());
            model.addAttribute("tasks", taskService.findAllTasks());
            return "assignment-form"; // name of your .html file
        }


        @GetMapping("/assignment/{userId}")
        public String showUserAssigmentForm(@PathVariable Long userId) {
            model.addAttribute("user", userService.findById(userId));
            model.addAttribute("availableTasks", taskService.findUnassignedTasks());
            return "user-assignment";
        }


        @GetMapping("/assignment/assign/{userId}/{taskId}")
        public String assignTaskToUser(@PathVariable Long userId, @PathVariable Long taskId) {
            userService.assignTask(userId, taskId);
            return "redirect:/assignment/" + userId;
        }


        @GetMapping("/assignment/unassign/{userId}/{taskId}")
        public String unassignTaskFromUser(@PathVariable Long userId, @PathVariable Long taskId) {
            userService.unassignTask(userId, taskId);
            return "redirect:/assignment/" + userId;
        }

}