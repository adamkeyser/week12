package edu.umn.msse.config

import edu.umn.msse.security.JWTAuthenticationFilter
import edu.umn.msse.security.JWTLoginFilter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Bean
  BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder()
  }


  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // disable caching
    http.headers().cacheControl()

    http.csrf().disable()
        .authorizeRequests()
        .antMatchers("/**").permitAll()
        .antMatchers("/api/**").permitAll()
        .antMatchers("/favicon.ico").permitAll()
        .antMatchers("/*.bundle.js").permitAll()
        .antMatchers("/index.html").permitAll()
        .antMatchers(HttpMethod.POST, "/login").permitAll()
        .antMatchers("/admin/**").hasRole("ADMIN")
        .anyRequest().authenticated()
        .and()
    .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
    .addFilterBefore(new JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
  }

  @Autowired
  void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    def inMemoryAuth = auth.inMemoryAuthentication()
    inMemoryAuth.withUser("msse-admin").password("password").roles("ADMIN")
  }
}
