package com.task.app.Repository;

import java.util.Collection;
import java.util.Set;
import com.task.app.Entity.Role;
import com.task.app.Dto.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

    Boolean existsByRole(String role);

    @Override
    Optional<Role> findById(Long aLong);

    Set<Role> findByNameIn(Collection<Status> names);

    Iterable<Long> role(String role);
}
