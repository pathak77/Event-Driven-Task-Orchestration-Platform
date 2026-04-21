package com.prod.auth.Config;

import com.prod.auth.JwtConfig.JWTAuthenticationFilter;
import com.prod.auth.JwtConfig.TokenHelper;
import com.prod.auth.Service.UserDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    TokenHelper jwtTokenHelper;
    UserDetailService userDetailService;

    SecurityConfig(TokenHelper jwtTokenHelper, UserDetailService userDetailService){
        this.jwtTokenHelper = jwtTokenHelper;
        this.userDetailService = userDetailService;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return
                http
                        .csrf(AbstractHttpConfigurer::disable)
                        .authorizeHttpRequests( requests ->
                                requests
                                .requestMatchers(HttpMethod.POST, "/auth/register","/auth/login").permitAll()
                                .requestMatchers(HttpMethod.GET, "/auth/**").permitAll()
                                .requestMatchers("/oauth2/**", "/login/**", "/logout/**").permitAll()
                                .anyRequest()
                                .authenticated())
                        .addFilterBefore(new JWTAuthenticationFilter(jwtTokenHelper, userDetailService), UsernamePasswordAuthenticationFilter.class)
                        .build();

    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
