package com.task.app.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Objects;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;


    @NotEmpty(message = "Task name cannot be empty")
    private String name;

    @NotEmpty(message = "Task description cannot be empty")
    @Column(length = 1200)
    @Size(max = 1200, message = "1000")
    private String description;

    @NotNull(message = "Date cant be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    private boolean isCompleted;

    private String creatorName;


    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "OWNER_ID")
    private User owner;

    public long daysLeftUntilDeadline(Date date) {
        LocalDate deadline = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate today = LocalDate.now();

        return ChronoUnit.DAYS.between(today, deadline);
    }

  
    public Task(@NotEmpty String name,
                @NotEmpty @Size(max = 1200) String description,
                @NotNull Date date,
                boolean isCompleted,
                String creatorName) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.isCompleted = isCompleted;
        this.creatorName = creatorName;
    }

    public Task(@NotEmpty String name,
                @NotEmpty @Size(max = 1200) String description,
                @NotNull Date date,
                boolean isCompleted,
                String creatorName,
                User owner) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.isCompleted = isCompleted;
        this.creatorName = creatorName;
        this.owner = owner;
    }



    public boolean isCompleted() {
        return isCompleted;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return isCompleted == task.isCompleted &&
                Objects.equals(id, task.id) &&
                name.equals(task.name) &&
                description.equals(task.description) &&
                date.equals(task.date) &&
                Objects.equals(creatorName, task.creatorName) &&
                Objects.equals(owner, task.owner);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, date, isCompleted, creatorName, owner);
    }
}