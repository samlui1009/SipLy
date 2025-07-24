package com.siply.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.siply.backend.model.User;
import com.siply.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;
    private BCryptPasswordEncoder encoder;

    public UserService(UserRepository userRepo, BCryptPasswordEncoder pWordEncoder) {
        this.repo = userRepo;
        this.encoder = pWordEncoder;
    }

    public User register(User user) {
        user.setPassWord(encoder.encode(user.getPassWord()));
        return repo.save(user);
        // Returning the user HERE
    }

}
