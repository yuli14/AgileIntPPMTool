package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static io.agileintelligence.ppmtool.security.SecurityConstants.EXPIRATION_TIME;
import static io.agileintelligence.ppmtool.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

//    Generate the token
    public String generateToken(Authentication authentication){
//        get
//        self authenticated
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
//encode and decode these information in token holder
//        roles can also be added in claims

        String userId = Long.toString(user.getId());
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());
//        claims.put("")
        return Jwts.builder().
                setSubject(userId).
                setClaims(claims).
                setIssuedAt(now).
                setExpiration(expiryDate).
                signWith(SignatureAlgorithm.HS512, SECRET).
                compact();

    }

//    validate the token
//    get the user id from the token
}
