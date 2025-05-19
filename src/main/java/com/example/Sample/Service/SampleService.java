package com.example.Sample.Service;


import com.example.Sample.RequestAndResponseClasses.UserRequest;
import org.springframework.stereotype.Service;

@Service
public interface SampleService {

    String UserSignIn(UserRequest userRequest);

    String UserLogin(int id,String password);
}
