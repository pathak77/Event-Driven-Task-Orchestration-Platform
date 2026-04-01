package com.task.app.Services;

import com.task.app.Entity.Role;

import java.util.List;

public interface RoleService {
    Role createRole(Role role);

    List<Role> findAll();
}