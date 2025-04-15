package com.hotelbookingapp.hotelhop.service;

import com.hotelbookingapp.hotelhop.exception.UserAlreadyExistsException;
import com.hotelbookingapp.hotelhop.model.Role;
import com.hotelbookingapp.hotelhop.model.User;
import com.hotelbookingapp.hotelhop.repository.RoleRepository;
import com.hotelbookingapp.hotelhop.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;


    private static final List<String> ADMIN_EMAILS = List.of("admin@example.com", "owner@example.com");

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Assign role based on email
        Role role = roleRepository.findByName(ADMIN_EMAILS.contains(user.getEmail()) ? "ROLE_ADMIN" : "ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found in database"));

        user.setRoles(Collections.singletonList(role));

        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null){
            userRepository.deleteByEmail(email);
        }

    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
