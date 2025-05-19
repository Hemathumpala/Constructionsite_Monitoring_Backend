package com.example.Sample.Controller;


import com.example.Sample.Entity.MonitoringImages;
import com.example.Sample.Repo.MonitoringImagesRepo;
import com.example.Sample.RequestAndResponseClasses.UserRequest;
import com.example.Sample.Service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class SampleController {

    @Autowired
    SampleService sampleService;

    @Autowired
    MonitoringImagesRepo imageRepository;

    @PostMapping("/UserSign")
    public String UserSignIn(@RequestBody UserRequest userRequest){

        return sampleService.UserSignIn(userRequest);
    }

    @GetMapping("/userAuthnetication/{id}/{password}")
    public String UserLogin(@PathVariable int id,@PathVariable String password){
        return sampleService.UserLogin(id,password);
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            MonitoringImages image = new MonitoringImages();
            image.setName(file.getOriginalFilename());
            image.setType(file.getContentType());
            image.setImage_data(file.getBytes());

            imageRepository.save(image);

            return ResponseEntity.ok("Image uploaded successfully. ID: " + image.getId());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload image: " + e.getMessage());
        }
    }
    @PostMapping("/update/{id}")
    public ResponseEntity<String> updateImage(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        try {
            MonitoringImages optionalImage = imageRepository.findById(id);
            if (optionalImage!=null) {

                optionalImage.setName(file.getOriginalFilename());
                optionalImage.setType(file.getContentType());
                optionalImage.setImage_data(file.getBytes());

                imageRepository.save(optionalImage);

                return ResponseEntity.ok("Image updated successfully. ID: " + optionalImage.getId());
            } else {
                return ResponseEntity.status(404).body("Image not found with ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update image: " + e.getMessage());
        }
    }


    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImageById(@PathVariable int id) {
        MonitoringImages imageOpt = imageRepository.findById(id);

        if (imageOpt!=null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(imageOpt.getType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageOpt.getName() + "\"")
                    .body(imageOpt.getImage_data());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/deleteimage/{id}")
    public String deleteImageById(@PathVariable int id) {
        MonitoringImages imageOpt = imageRepository.findById(id);
        String res="";
        if(imageOpt!=null){
            imageRepository.deleteById(imageOpt.getId());
            res="DELETED SUCCESFULLY ";
        }
        else{
            res="DATA NOT FOUND WITH ID"+" "+id;
        }
        return res;
    }
    @GetMapping("/images")
    public ResponseEntity<List<Map<String, Object>>> getAllImages() {
        List<MonitoringImages> images = imageRepository.findAll();

        List<Map<String, Object>> imageList = images.stream().map(image -> {
            Map<String, Object> imageMeta = new HashMap<>();
            imageMeta.put("id", image.getId());
            imageMeta.put("name", image.getName());
            imageMeta.put("type", image.getType());
            imageMeta.put("size", image.getImage_data().length);
            return imageMeta;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(imageList);
    }



}
