package com.blog.BlogSite.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.blog.BlogSite.Model.Comment;
import com.blog.BlogSite.Model.Detail;
import com.blog.BlogSite.Model.SearchRequest;
import com.blog.BlogSite.Services.BlogServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@CrossOrigin
public class ControllerHub {

    @Autowired
    private BlogServices services;

    @GetMapping("/allBlog")
    public ResponseEntity<List<Detail>> allblog() {


        System.out.println("helllo from controller all blog");

        List<Detail> blogs=services.showblogs();

        System.out.println("Your blogs are here "+" "+blogs);
        if(blogs!=null){
            return ResponseEntity.status(HttpStatus.OK).body(blogs);
        }
        return ResponseEntity.status(HttpStatus.OK).body(List.of());
    }


    @PutMapping("/like/{id}")
    public String HandleLikes(@PathVariable int id) {

        System.out.println(id);
        
        return services.handlelikes(id);
    }

    @GetMapping("/getlike/{id}")
    public int getMethodName(@PathVariable int id) {
        return services.getLikeById(id);
    }
    

    @GetMapping("getBlog/{id}")
    public Detail getBlogByID(@PathVariable String id) {
        System.out.println("in your api");
        System.out.println(id);
        return services.getBlogById(Integer.parseInt(id));
    }
    


    @PostMapping("/addBlog")
    public ResponseEntity<String> addBlog(@RequestBody Detail detail) {
        Detail det1=services.addMyBlog(detail);

        if(det1!=null){
            return ResponseEntity.status(HttpStatus.CREATED).body("Success Fully added");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Try again");
    }

    @PostMapping("/search")
    public List<Detail> showblog(@RequestBody SearchRequest req) {

        System.out.println(req.getTitle());
        return services.showMyBlog(req.getTitle());
    }

    @PostMapping("/comment/{id}")
    public String addComment(@RequestBody String comments,@PathVariable int id) {
        System.out.println(comments);
        return services.addComment(comments,id);
    }

    @GetMapping("/getComment/{id}")
    public List<Comment> getComments(@PathVariable int id){
        return services.getCommentsById(id);
    }
    
    
    

    // @DeleteMapping("/dlt/{title}")
    // public ResponseEntity<String> dltBlog(@PathVariable String title){

    //     Detail det=services.showMyBlog(title);

    //     if(det!=null){
    //         services.DltMyBlog(title);
    //         return ResponseEntity.status(HttpStatus.GONE).body("Deleted Successfully");
    //     }

    //     return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found..");

    // }
    
    
}
