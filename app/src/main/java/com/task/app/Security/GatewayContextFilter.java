package com.task.app.Security;

import com.task.app.Dto.UserDto;
import com.task.app.Services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;
import java.util.Collections;


@Component
public class GatewayContextFilter extends OncePerRequestFilter {

    final UserService  userService;

    GatewayContextFilter(UserService userService) {
        this.userService = userService;
    }

    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        try {
        String userId = request.getHeader("X-userId");
        String username = request.getHeader("X-username");

        if(userId != null && username != null) {
            // LOG THIS: Ensure the headers actually arrived in the container
            System.out.println("DEBUG: Filter received ID: " + userId + " Name: " + username);
            
            UserDto userDto = new UserDto(Long.parseLong(userId), username);
            userService.syncUserFromGateway(userDto);

            UserPrincipal principal = new UserPrincipal(userId, username);
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(principal, null, Collections.emptyList());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);

    } catch (Exception e) {
        // This will print the ACTUAL error to your docker logs
        System.err.println("FILTER ERROR: " + e.getMessage());
        e.printStackTrace(); 
        throw e;
    } finally {
        SecurityContextHolder.clearContext();
    }
    }


}
