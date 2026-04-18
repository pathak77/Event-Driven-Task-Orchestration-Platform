package com.task.app.Services;

import com.task.app.Dto.Authority;
import com.task.app.Entity.Role;
import com.task.app.Repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

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

    public Set<Role> findAllById(Set<Authority> roleIds){
        return roleRepository.findByNameIn(roleIds);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}