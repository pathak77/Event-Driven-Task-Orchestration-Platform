package com.task.app.Security;

import com.task.app.Dto.UserDto;
import com.task.app.Services.UserService;
import com.task.app.Services.UserServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.security.auth.Subject;
import java.io.IOException;
import java.security.Principal;
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

        String userId = request.getHeader("userId");
        String username = request.getHeader("username");


        if(userId != null && username != null) {

            UserDto userDto = new UserDto(Long.parseLong(userId), username);
            userService.createUser(userDto);


            UserPrincipal principal = new UserPrincipal(userId, username);
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(principal, null, Collections.emptyList());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        try{
            filterChain.doFilter(request, response);
        }

        finally {
            SecurityContextHolder.clearContext();
        }
    }


}
