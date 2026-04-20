package com.task.app.Services;

import com.task.app.Dto.Authority;
import com.task.app.Entity.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    Role createRole(Role role);

    Role findByName(Authority authority);

    List<Role> findAll();

    Set<Role> findByNameIn(Set<Authority> newAuthorities);

}