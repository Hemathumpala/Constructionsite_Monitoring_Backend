package com.example.Sample.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Entity
@Table(schema = "employee",name = "emp_details")
public class User {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name="id")
   private int userId;

   @Column(name="first_name")
    private String name;

   @Column(name="des")
    private String Userdescription;

    @Column(name="role")
    private String role;

    @Column(name="password")
    private String password;

}
