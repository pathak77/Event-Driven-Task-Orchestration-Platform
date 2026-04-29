package com.task.app.Kafka;


import com.task.app.Dto.UserDto;
import com.task.app.Services.UserService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    final UserService userService;

    public KafkaConsumer(UserService userService) {
        this.userService = userService;
    }

    @KafkaListener(topics = "auth_event", groupId = "task-service-group")
    public void listen(UserEvent user) {

        System.out.println("Received: " + user.getUsername());
       UserDto userDto = UserDto.builder()
               .userId(Long.valueOf(user.getUserId()))
               .username(user.getUsername())
               .build();

       userService.syncUserFromGateway(userDto);

    }

}
