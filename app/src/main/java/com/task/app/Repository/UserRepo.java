package com.task.app.Repository;

import com.task.app.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Override
    Optional<User> findById(Long aLong);

    User findByEmail(String email);
}