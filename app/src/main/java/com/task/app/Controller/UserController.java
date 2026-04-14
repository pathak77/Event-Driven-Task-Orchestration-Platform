package com.task.app.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/api/v1/user")
public class UserController {


    @GetMapping("/users")
    public String listUsers(Model model, SecurityContextHolderAwareRequestWrapper request) {

    }


    @GetMapping("user/delete/{id}")
    public String deleteUser(@PathVariable Long id) {

    }
}
