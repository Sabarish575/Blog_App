package com.blog.BlogSite.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.BlogSite.Model.Like;
import com.blog.BlogSite.Model.Person;

@Repository
public interface LikeRepo extends JpaRepository<Like,Integer> {

    List<Like> findAllByTitleid(int title_id);

    Like findByUserAndTitleid(Person p1,int title_id);
    
}
