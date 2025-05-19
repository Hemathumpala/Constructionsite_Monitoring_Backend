package com.example.Sample.Service.impl;


import com.example.Sample.Entity.User;

import com.example.Sample.Repo.UserRepo;
import com.example.Sample.RequestAndResponseClasses.UserRequest;
import com.example.Sample.Service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceImpl implements SampleService {

    @Autowired
    UserRepo userRepo;


    @Override
    public String UserSignIn(UserRequest userRequest) {
        try {
            User user = User.builder()
                    .name(userRequest.getName())
                    .role(userRequest.getRole())
                    .Userdescription(userRequest.getDes())
                    .password(userRequest.getPassword())
                    .build();
            userRepo.save(user);
            return "SIGNIN SUCCESSFULL WITH ID"+" "+user.getUserId();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    public String UserLogin(int id,String password){
           try{
               String res="";
               User user=userRepo.findByUserIdAndPassword(id,password);
               if(user==null){
                   res="DATA NOT FOUND WITH GIVEN CREDENTIALS";
               }
               else {
                   res = "DATA EXITS WITH USERROLE" + " " + user.getRole();
               }
               return res;
           } catch (Exception e) {
               throw new RuntimeException(e);
           }
    }

}
