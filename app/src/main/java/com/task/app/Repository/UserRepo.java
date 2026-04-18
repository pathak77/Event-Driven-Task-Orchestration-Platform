package com.task.app.Repository;

import com.task.app.Dto.Status;
import com.task.app.Entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Override
    Optional<User> findById(Long aLong);

    Optional<User> findByEmailOrPhoneNumber(@Email @NotEmpty String email, String phoneNumber);

    boolean existsByEmailOrPhoneNumber(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsById(Long id);

    boolean existsByUserIdAndStatus(Long userId, Status status);
}