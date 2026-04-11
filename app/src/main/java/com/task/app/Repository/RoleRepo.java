package com.task.app.Repository;

import com.task.app.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

    Optional<Role> findByRole(String user);
    Boolean existsByRole(String role);

}
