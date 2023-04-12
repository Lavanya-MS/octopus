package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.TokenValidity;
import com.octopus.teraHire.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TokenValidityRepository extends JpaRepository<TokenValidity,Long> {

    TokenValidity findByToken(String token);
    TokenValidity findByUser(User user);
    @Query("select t from TokenValidity t where t.user.Id = ?1")
    TokenValidity FindTokenbyUserId(long id);

    @Query("select user from User user where user.Id = ?1")
    TokenValidity findByUser_Id(long id);


    @Override
    TokenValidity getReferenceById(Long aLong);

    @Override
    Optional<TokenValidity> findById(Long aLong);
}
