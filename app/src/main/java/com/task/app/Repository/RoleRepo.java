package com.task.app.Repository;

import com.task.app.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

    Boolean existsByRole(String role);

    @Override
    Optional<Role> findById(Long aLong);


    Iterable<Long> role(String role);
}
