package com.example.Sample.Repo;

import com.example.Sample.Entity.MonitoringImages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonitoringImagesRepo extends JpaRepository<MonitoringImages,Integer> {

    MonitoringImages findById(int id);
}
