package com.blog.BlogSite.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.blog.BlogSite.Model.AuthResponseDTO;
import com.blog.BlogSite.Model.Person;
import com.blog.BlogSite.Services.PersonServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin
public class SecurityController {

    @Autowired
    private PersonServices services;


    @PostMapping("/register")
    public String registerUser(@RequestBody Person person) {
        return services.signup(person);
    }

    @PostMapping("/signin")
    public AuthResponseDTO postMethodName(@RequestBody Person person) {

        System.out.println("In controllerrr"+" "+person.getPassword());
        
        return services.login(person);
    }


    @GetMapping("/name/{id}")
    public String getNameByid(@PathVariable int id){

        return services.getNameByid(id);

    }
    


    
}
