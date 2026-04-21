package com.prod.auth.JwtConfig;

import com.prod.auth.Entity.UserDetail;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
public class TokenHelper {

    private final String appName;
    private final String secretKey;
    private final long jwtExpiration;

    public TokenHelper(
            @Value("${security.app-name}") String appName,
            @Value("${security.jwt.secret-key}") String secretKey,
            @Value("${security.jwt.expiration-time}") long jwtExpiration
    ) {
        this.appName = appName;
        this.secretKey = secretKey;
        this.jwtExpiration = jwtExpiration;
    }
    public String generateToken(UserDetail userDetail) {
        return generateToken(new HashMap<>(), userDetail);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetail userDetail) {
        return buildToken(extraClaims, userDetail, getExpirationTime());
    }

    public boolean validateToken(String token, UserDetail userDetail) {
        try {
            Claims claims = getClaimsFromToken(token);

            return claims.getSubject().equals(userDetail.getUsername()) &&
                    claims.getExpiration().after(new Date());
        }
        catch (Exception e) {
            return false;
        }
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return claims.getExpiration().after(new Date());
        }
        catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }


    public Date getExpirationTime() {
        return new Date(System.currentTimeMillis() + jwtExpiration);
    }

    public Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            final Claims claims = getClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetail UserDetail,
            Date expiration
    ) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(UserDetail.getUsername())
                .issuer(appName)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(expiration)
                .signWith(getSignInKey())
                .compact();
    }


    public String extractUsername(String token) {
        String UserDetailname;
        try{
            final Claims claims = getClaimsFromToken(token);
            UserDetailname = claims.getSubject();
        }
        catch(Exception e){
            UserDetailname = null;
        }
        return UserDetailname;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = (Claims) Jwts.parser()
                    .verifyWith(getSignInKey())
                    .build()
                    .parse(token)
                    .getPayload();
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired token", e);
        }
        return claims;
    }

    private SecretKey getSignInKey() {
        byte[] keysBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keysBytes);
    }
}