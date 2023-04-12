package com.octopus.teraHire.controller;


import com.octopus.teraHire.model.AuthUser;
import com.octopus.teraHire.model.EmailDetails;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.service.EmailService;
import com.octopus.teraHire.service.UserDetailsServiceImpl;
import com.octopus.teraHire.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/user")
@SecurityRequirement(name = "user-authenticate")
public class UserController {


    private UserService userService;
    private UserDetailsServiceImpl userDetailsService;
    private EmailService emailService;
    // private AuthenticationManager authenticationManager;

    public UserController(UserService userService,UserDetailsServiceImpl userDetailsService){
        this.userService = userService;
        this.userDetailsService = userDetailsService;

    }

    @CrossOrigin("http://localhost:4200/")
    @PostMapping("/new")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> addNewUser(@RequestBody @Valid User user){

        return userService.addNewUser(user);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<User> updateNewUser(@PathVariable long id,@RequestBody User userDetails){
        return userService.updateNewUser(id,userDetails);
    }

    @CrossOrigin("http://localhost:4200/")
    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR','ROLE_HM','ROLE_IN')")
    public List<User> getUserList(){

        return userService.getUserList();

    }
    //@PreAuthorize("haAnyRole('ROLE_ADMIN','ROLE_USER')")
    //@GetMapping(value = "/{id}")
    //public ResponseEntity<User> getUserById(@PathVariable long id)
    //{return userService.getUserById(id);}


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER','ROLE_HR','ROLE_HM','ROLE_IN')")
    @GetMapping(value = "/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email)
    {return userService.getUserByEmail(email);}

    @DeleteMapping (value="delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Object> deleteUser(@PathVariable long id){

        return userService.deleteUserById(id);


    }




}
