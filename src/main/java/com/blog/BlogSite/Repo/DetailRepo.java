package com.blog.BlogSite.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.BlogSite.Model.Detail;


@Repository
public interface DetailRepo extends JpaRepository<Detail,Integer>{

    List<Detail> findByTitle(String title);
}
