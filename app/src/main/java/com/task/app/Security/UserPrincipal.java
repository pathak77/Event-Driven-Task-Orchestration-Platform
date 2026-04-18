package com.task.app.Security;

import java.security.Principal;

public record UserPrincipal(String id, String name) implements Principal {
    @Override
    public String getName() {
        return name;
    }
}
