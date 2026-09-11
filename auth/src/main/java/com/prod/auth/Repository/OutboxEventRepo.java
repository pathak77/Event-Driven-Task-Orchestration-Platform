package com.prod.auth.Repository;

import com.prod.auth.Entity.OutboxEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OutboxEventRepo extends JpaRepository<OutboxEvent, String> {
    List<OutboxEvent> findAllByOrderByCreatedAtAsc();
}
