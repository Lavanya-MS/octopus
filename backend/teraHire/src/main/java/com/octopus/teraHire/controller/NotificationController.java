package com.octopus.teraHire.controller;
import com.octopus.teraHire.model.Job;
import com.octopus.teraHire.model.Notification;
import com.octopus.teraHire.service.NotificationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = {"*"})

@RestController
@RequestMapping("/api/notification")
@SecurityRequirement(name = "user-authenticate")
public class NotificationController {
    private NotificationService notificationService;
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR','ROLE_IN','ROLE_HM')")
    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Notification>> getNotifications(){
        return notificationService.getNotifications();
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR','ROLE_IN','ROLE_HM')")
    @PutMapping("/update/{id}/{userId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity updateNotification(@PathVariable("id") long id,@PathVariable("userId") long userId){
        return notificationService.updateNotifications(id,userId);
    }
}