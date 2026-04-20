package com.task.app.Repository;

import java.util.Collection;
import java.util.Set;

import com.task.app.Dto.Authority;
import com.task.app.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

    boolean existsByName(Authority name);

    Set<Role> findByNameIn(Collection<Authority> names);

    Optional<Role> findByName(Authority name);
}