package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.domain.validator.UserValidator;
import io.agileintelligence.ppmtool.exceptions.UsernameAlreadyExistsException;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder; //need to create a bean before autowired, in the main now

    public User saveUser(User newUser){
//        username has to be unique (exception)

//        make sure that password and confirmPassword match
//        we don;t persist or show confirmPassword


        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        }
        catch (Exception e){
            throw new UsernameAlreadyExistsException("Username " + newUser.getUsername() + " Already exists");
        }



    }
}
