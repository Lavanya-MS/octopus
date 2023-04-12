package com.octopus.teraHire.service;
import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.model.Notification;
import com.octopus.teraHire.repository.NotificationRepository;
import com.octopus.teraHire.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService implements NotificationInterface{
    private NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    @Override
    public ResponseEntity createNotification(Notification notification) {
        return new ResponseEntity(notificationRepository.save(notification), HttpStatus.OK);
    }
    @Override
    public ResponseEntity<List<Notification>> getNotifications() {
        return new ResponseEntity<List<Notification>>(notificationRepository.findByOrderByCreatedDateDesc(),HttpStatus.OK);
    }
    @Override
    public ResponseEntity updateNotifications(long id,long userId) {

        ArrayList<Long> newArray = new ArrayList<>();


        Optional<Notification> updatedNotification = notificationRepository.findById(id);
        newArray.addAll(updatedNotification.get().getNotificationStatus());
        if(!newArray.contains(userId)){
           newArray.add(userId);
        }
        if (updatedNotification.isPresent()) {
            updatedNotification.get().setNotificationStatus(newArray);
            return new ResponseEntity<>(notificationRepository.save(updatedNotification.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResourceNotFoundException("Notification Does not exist with " + id).getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}