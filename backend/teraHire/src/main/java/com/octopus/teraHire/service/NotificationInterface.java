package com.octopus.teraHire.service;

import com.octopus.teraHire.model.Notification;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NotificationInterface {

    ResponseEntity createNotification(Notification notification);
    ResponseEntity<List<Notification>> getNotifications();


    ResponseEntity updateNotifications(long id,long userId);


}
