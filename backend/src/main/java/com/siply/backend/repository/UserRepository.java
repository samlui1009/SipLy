package com.siply.backend.repository;

import com.siply.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String emailAddress);
    // https://www.youtube.com/watch?v=RI3UpqUZq50

}
