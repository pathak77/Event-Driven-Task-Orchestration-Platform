package com.task.app.Kafka;


import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @KafkaListener(topics = "auth_event", groupId = "task-service-group")
    public void listen(UserEvent user) {
        System.out.println("Received: " + user.getUsername());
    }

}
