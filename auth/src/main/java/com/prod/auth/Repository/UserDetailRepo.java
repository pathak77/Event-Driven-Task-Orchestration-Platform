package com.prod.auth.Repository;

import com.prod.auth.Entity.UserDetail;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDetailRepo extends JpaRepository<UserDetail, Long> {

    Boolean existsByEmail(String email);

    Boolean existsByUsername(@NotBlank String username);
    Optional<UserDetail> findByEmail(String email);

    Optional<UserDetail> findUserByUsername(@NotBlank String username);
}
