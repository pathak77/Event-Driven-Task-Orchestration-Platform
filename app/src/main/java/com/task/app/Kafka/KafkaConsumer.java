package com.task.app.Kafka;


import com.task.app.Dto.UserDto;
import com.task.app.Entity.ProcessedEvent;
import com.task.app.Repository.ProcessedEventRepo;
import com.task.app.Services.UserService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class KafkaConsumer {

    private static final Logger log = LoggerFactory.getLogger(KafkaConsumer.class);

    private final UserService userService;
    private final ProcessedEventRepo processedEventRepo;

    public KafkaConsumer(UserService userService, ProcessedEventRepo processedEventRepo) {
        this.userService = userService;
        this.processedEventRepo = processedEventRepo;
    }

    @Transactional
    @KafkaListener(topics = "auth_event", groupId = "task-service-group")
    public void listen(UserEvent user) {
        if (user.getEventId() == null) {
            log.warn("Received event without eventId: {}", user.getUsername());
            // Fallback: Use userId as idempotency key if eventId is missing
            user.setEventId("user-create-" + user.getUserId());
        }

        if (processedEventRepo.existsById(user.getEventId())) {
            log.info("Event {} already processed. Skipping.", user.getEventId());
            return;
        }

        log.info("Processing event for user: {}", user.getUsername());
        
        UserDto userDto = UserDto.builder()
               .userId(Long.valueOf(user.getUserId()))
               .username(user.getUsername())
               .build();

        userService.syncUserFromGateway(userDto);
        
        // Mark as processed
        processedEventRepo.save(new ProcessedEvent(user.getEventId()));
    }

}
