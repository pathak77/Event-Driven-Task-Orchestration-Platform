package com.task.app.Repository;

import com.task.app.Dto.Authority;
import com.task.app.Dto.Status;
import com.task.app.Entity.Role;
import com.task.app.Entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Override
    Optional<User> findById(Long aLong);

    Optional<User> findByEmailOrPhoneNumber(@Email @NotEmpty String email, String phoneNumber);

    boolean existsByEmailOrPhoneNumber(String email, String phone);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsById(Long id);

    boolean existsByUserIdAndRoles_Name(Long userId, Authority name);

    @Modifying
    @Query(value = """
    INSERT INTO users (user_id, username) 
    VALUES (:userId, :username) 
    ON CONFLICT (user_id) 
    DO UPDATE SET username = EXCLUDED.username
    """, nativeQuery = true)
    void upsertUser(@Param("userId") Long userId, @Param("username") String username);

}