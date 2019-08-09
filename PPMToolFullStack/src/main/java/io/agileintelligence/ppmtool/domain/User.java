package io.agileintelligence.ppmtool.domain;


import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "username is required")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "please enter your full name")
    private String fullName;
    @NotBlank(message = "Password field is required")
    private String password;

//    not persist
    @Transient
    private String confirmPassword;
    private Date create_At;
    private Date update_At;
//oneToMany with Project
    public User(){

    }
    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}
