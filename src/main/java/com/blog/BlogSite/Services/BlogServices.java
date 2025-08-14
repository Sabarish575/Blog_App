package com.blog.BlogSite.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.method.P;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.blog.BlogSite.Model.Comment;
import com.blog.BlogSite.Model.Detail;
import com.blog.BlogSite.Model.Like;
import com.blog.BlogSite.Model.Person;
import com.blog.BlogSite.Repo.CommentRepo;
import com.blog.BlogSite.Repo.DetailRepo;
import com.blog.BlogSite.Repo.LikeRepo;
import com.blog.BlogSite.Repo.PersonRepo;

@Service
public class BlogServices {

    @Autowired
    private DetailRepo repo;

    @Autowired
    private LikeRepo likerepo;

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private PersonRepo personRepo;

    public Detail addMyBlog(Detail detail){
        return repo.save(detail);
    }

    public List<Detail> showMyBlog(String title){
        System.out.println("in services..,"+" "+ title);
        return repo.findByTitle(title);
    }

    // public void DltMyBlog(String title){
    //     repo.deleteById(title);
    // }

    public List<Detail> showblogs(){
        return repo.findAll();
    }

    public String handlelikes(int title_id) {

        Authentication auth=SecurityContextHolder.getContext().getAuthentication();

        String name=auth.getName();

        Person p1=personRepo.findByName(name);

        Like l1=likerepo.findByUserAndTitleid(p1,title_id);

            if(l1==null){

                Like like=new Like();
                like.setLikes(1);
                like.setUser(p1);
                like.setTitleid(title_id);
                likerepo.save(like);
            }
            else{

                likerepo.delete(l1);

            }

        

        return "liked"; // Return appropriate value
    }

    public String addComment(String comments, int blogid) {


        Authentication auth=SecurityContextHolder.getContext().getAuthentication();

        String userName=auth.getName();

        Person p1=personRepo.findByName(userName);

        if (p1!=null){
            Comment cm=new Comment();
            cm.setBlogid(blogid);
            cm.setComments(comments);
            cm.setUserid(p1);

            commentRepo.save(cm);

            return "add successfully";
        }

        return "failed to addS";
    }

    public List<Comment> getCommentsById(int id) {
        return commentRepo.findByBlogid(id);
    }

    public Detail getBlogById(int id) {

        return repo.findById(id).orElse(null);
    }

    public int getLikeById(int id) {

        List<Like> like = likerepo.findAllByTitleid(id);

        if(like == null){
            return 0;
        }

        int totalikes=like.stream().mapToInt(Like::getLikes).sum();

        return totalikes;

    }


    
}
