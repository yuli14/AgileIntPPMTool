package io.agileintelligence.ppmtool.exceptions;

public class InvalidLoginResponse {
//    json object to return
//    need to be wired up
    private String username;
    private String password;

    public InvalidLoginResponse(){
//        hard code for no hint for malicious user
        this.username = "Invalid username";
        this.password = "Invalid password";
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
