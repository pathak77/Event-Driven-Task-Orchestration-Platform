package com.task.app.Services;

import com.task.app.Entity.Role;
import com.task.app.Repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepo roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepo roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> findAllById(List<Long> roleIds){
        List<Role> roles = roleRepository.findAllById(roleIds);
        return roles;
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}