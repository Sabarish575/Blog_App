package com.blog.BlogSite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.blog.BlogSite.Model.Person;
import com.blog.BlogSite.Repo.PersonRepo;

@Service
public class CustomerServices implements UserDetailsService {

    @Autowired
    private PersonRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Person p1=repo.findByName(username);
        return new PersonPrinciple(p1);
    }
    
}
