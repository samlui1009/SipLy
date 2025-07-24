package com.siply.backend.repository;

import com.siply.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmailAddress(String emailAddress);
    // https://www.youtube.com/watch?v=RI3UpqUZq50

    Boolean existsByEmailAddress(String emailAddress);
    // https://medium.com/@villysiu/java-springboot-signup-login-rest-api-d01b21759ba9

}
