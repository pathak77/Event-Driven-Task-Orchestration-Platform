package com.task.app.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Email
    @NotEmpty
    @Column(unique = true)
    private String email;

    private String name;

    private String password;

    private String phoneNumber;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'images/user.png'")
    private String photo;

    @Length(max = 150)
    String bio;

    @ManyToMany
    @JoinTable(
            name = "task_assignments",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private List<Task> tasksList;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Task> ownedTasks;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;


    public boolean isAdmin() {
        String roleName = "ADMIN";
        return roles.stream().map(Role::getRole).anyMatch(roleName::equals);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;
        return Objects.equals(this.id, user.id) &&
                this.email.equals(user.email) &&
                this.name.equals(user.name) &&
                this.password.equals(user.password) &&
                Objects.equals(this.photo, user.photo) &&
                Objects.equals(this.roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, name, password, photo, roles);
    }
}
