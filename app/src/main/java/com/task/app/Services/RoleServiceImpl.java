package com.task.app.Services;

import com.task.app.Entity.Role;
import com.task.app.Repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private RoleRepo roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepo roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }


    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}