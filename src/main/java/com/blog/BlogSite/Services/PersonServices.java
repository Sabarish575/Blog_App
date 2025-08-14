package com.blog.BlogSite.Services;


import org.springframework.beans.factory.annotation.Autowired;
// Removed incorrect import for CouchbaseProperties.Authentication
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.blog.BlogSite.Model.AuthResponseDTO;
import com.blog.BlogSite.Model.Person;
import com.blog.BlogSite.Repo.PersonRepo;

@Service
public class PersonServices {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTServices jwtServices;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PersonRepo repo;

    public String signup(Person person) {

        person.setPassword(passwordEncoder.encode(person.getPassword()));
        repo.save(person);
        return "sucesss...";
    }

    public AuthResponseDTO login(Person person) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(person.getName(), person.getPassword())
        );

        if(authentication.isAuthenticated()){

            Person dbPerson = repo.findByName(person.getName());
            if (dbPerson == null) {
                throw new RuntimeException("User not found");
            }
            String token=jwtServices.generateToken(dbPerson.getName());
            System.out.println("generated token: "+" "+token);
            return new AuthResponseDTO(token);
        }

        throw new RuntimeException("Validation failed");
    }

    public String getNameByid(int id) {

        Person p1=repo.findById(id).orElse(null);

        if(p1!=null){
            return p1.getName();
        }

        return "no Name";

    }



    
}
