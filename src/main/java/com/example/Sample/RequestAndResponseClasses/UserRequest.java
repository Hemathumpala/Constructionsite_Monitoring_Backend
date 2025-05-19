package com.example.Sample.RequestAndResponseClasses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    int id;
    String name;
    String des;
    String role;
    String password;

}
