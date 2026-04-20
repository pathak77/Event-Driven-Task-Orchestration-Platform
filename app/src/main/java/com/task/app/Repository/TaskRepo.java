package com.task.app.Repository;

import com.task.app.Entity.Task;
import com.task.app.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {
    List<Task> findByOwnerOrderByDateDesc(User user);

    List<Task> findByIsCompleted(boolean completed);

    List<Task> findByAssignedUsers(Long userId);;
}
