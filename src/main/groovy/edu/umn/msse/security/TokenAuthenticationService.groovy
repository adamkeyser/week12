package edu.umn.msse.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.core.Authentication

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class TokenAuthenticationService {

  private long EXPIRATIONTIME = 1000 * 60 * 60 * 24 * 10 // 10 days
  private String secret = "ThisIsASecret"
  private String tokenPrefix = "Bearer"
  private String headerString = "Authorization"

  void createAndAddTokenToResponse(HttpServletResponse response, String username) {
    String JWT = Jwts.builder()
                     .setSubject(username)
                     .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                     .signWith(SignatureAlgorithm.HS512, secret)
                     .compact()
    response.addHeader(headerString, tokenPrefix + " " + JWT)
  }

  Authentication parseAndValidateToken(HttpServletRequest request) {
    String token = request.getHeader(headerString)
    if (token != null) {
      // parse the token.
      String username = Jwts.parser()
                         .setSigningKey(secret)
                         .parseClaimsJws(token)
                         .getBody()
                         .getSubject()

      return username ? new AuthenticatedUser(username) : null
    }
    return null
  }
}
