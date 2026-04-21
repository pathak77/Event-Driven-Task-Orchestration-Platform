package com.prod.auth.Controller;

import com.prod.auth.Dto.LoginRequestDto;
import com.prod.auth.Dto.LoginResponseDto;
import com.prod.auth.Dto.SignInRequestDto;
import com.prod.auth.Dto.SignInResponseDto;
import com.prod.auth.Entity.UserDetail;
import com.prod.auth.JwtConfig.TokenHelper;
import com.prod.auth.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {


    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final TokenHelper jwtTokenHelper;

    public AuthController(AuthenticationManager authenticationManager,
                          UserService userService,
                          TokenHelper jwtTokenHelper
    ) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtTokenHelper = jwtTokenHelper;
    }


    @GetMapping
    public String homePage() {
        return "Hello User";
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticateUser(
            @Valid
            @RequestBody
            LoginRequestDto loginRequest
    ) throws Exception {

        System.out.println(loginRequest.getUsername() + " " + loginRequest.getPassword() + " ");
        Authentication authentication;
        try {
             authentication= authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    loginRequest.getUsername(),
                                    loginRequest.getPassword()
                            )
                    );
        }
        catch (Exception e){
            throw new Exception("Invalid username or password");
        }


        SecurityContextHolder.getContext().setAuthentication(authentication);


        UserDetail user = (UserDetail) authentication.getPrincipal();
           if(!user.isEnabled()) {
               return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
           }

           String token = jwtTokenHelper.generateToken(user);

        LoginResponseDto response = LoginResponseDto.builder()
                .loginId(user.getUserId())
                .token(token)
                .build();

        return  ResponseEntity.ok(response);

    }


    @PostMapping("/register")
    public ResponseEntity<SignInResponseDto> registerUser(@Valid @RequestBody SignInRequestDto signinRequest) throws Exception {
        boolean doesUserExist = userService.existsByEmail(signinRequest.getEmail()) ||
                userService.existsByUsername(signinRequest.getUsername());

        if(doesUserExist) {
            throw new Exception("register error" + signinRequest.getUsername() + " already exists");
        }

        UserDetail user = UserDetail.builder()
                .email(signinRequest.getEmail())
                .username(signinRequest.getUsername())
                .password(signinRequest.getPassword())
                .build();

        UserDetail createdUser = userService.saveUser(user);
        SignInResponseDto responseDto = SignInResponseDto.builder()
                .username(createdUser.getUsername())
                .email(createdUser.getEmail())
                .message("user created successfully")
                .build();

        return ResponseEntity.ok(responseDto);
    }
    
    @GetMapping("/validate")
    public ResponseEntity<Boolean> verifyUser(@RequestBody String token) throws Exception {
        return ResponseEntity.ok().body(jwtTokenHelper.validateToken(token));
    }

    @GetMapping("/signout")
    public ResponseEntity<String> signOut() {
        SecurityContextHolder.clearContext(); // Optional: clears context for this specific request
        return ResponseEntity.ok("Sign out successful. Please delete the token from client storage.");
    }

}
