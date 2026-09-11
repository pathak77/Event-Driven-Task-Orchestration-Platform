package com.prod.auth.Scheduler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prod.auth.Entity.OutboxEvent;
import com.prod.auth.Kafka.KafkaProducer;
import com.prod.auth.Kafka.UserEvent;
import com.prod.auth.Repository.OutboxEventRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OutboxRelayScheduler {

    private static final Logger log = LoggerFactory.getLogger(OutboxRelayScheduler.class);

    private final OutboxEventRepo outboxEventRepo;
    private final KafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper;

    public OutboxRelayScheduler(OutboxEventRepo outboxEventRepo, KafkaProducer kafkaProducer, ObjectMapper objectMapper) {
        this.outboxEventRepo = outboxEventRepo;
        this.kafkaProducer = kafkaProducer;
        this.objectMapper = objectMapper;
    }

    @Scheduled(fixedDelay = 5000)
    public void processOutboxEvents() {
        List<OutboxEvent> events = outboxEventRepo.findAllByOrderByCreatedAtAsc();
        
        for (OutboxEvent event : events) {
            try {
                log.info("Relaying event {} to Kafka", event.getId());
                UserEvent userEvent = objectMapper.readValue(event.getPayload(), UserEvent.class);
                kafkaProducer.sendMessage(userEvent);
                
                // If send succeeds (assuming it's synchronous or we rely on at-least-once)
                outboxEventRepo.delete(event);
            } catch (Exception e) {
                log.error("Failed to process outbox event: {}", event.getId(), e);
                // Stop processing further events to maintain order, or just continue
                break;
            }
        }
    }
}
