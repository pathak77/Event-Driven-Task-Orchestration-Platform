package com.task.app.Repository;

import com.task.app.Entity.ProcessedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedEventRepo extends JpaRepository<ProcessedEvent, String> {
}
