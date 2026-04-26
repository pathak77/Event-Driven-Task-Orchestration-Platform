package com.task.app.Kafka;


import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class kafkaConsumer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public kafkaConsumer(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }


    public void sendMessage(UserEvent event) {
        kafkaTemplate.send("auth_api", event);
    }

}
