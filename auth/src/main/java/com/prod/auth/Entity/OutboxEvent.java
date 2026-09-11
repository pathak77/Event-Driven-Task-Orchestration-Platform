package com.prod.auth.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OutboxEvent {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String aggregateId;
    
    private String eventType;
    
    @Column(columnDefinition = "TEXT")
    private String payload;
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
