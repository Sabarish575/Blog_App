package com.blog.BlogSite.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.BlogSite.Model.Comment;
import java.util.List;



@Repository
public interface CommentRepo extends JpaRepository<Comment,Integer>{


    List<Comment> findByBlogid(int blogid);
}
