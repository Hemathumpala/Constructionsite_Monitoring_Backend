package com.example.Sample.Repo;


import com.example.Sample.Entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepo extends JpaRepository<User,Integer> {

    User findByUserId(int id);

    //List<User> findByDescription(String des);

    //List<User> findByRoleOrderByUserIdDesc(String role);



    User findByUserIdAndPassword(int userId, String password);







}
