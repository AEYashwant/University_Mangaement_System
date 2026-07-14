package com.university.service;

import com.university.model.Faculty;
import com.university.repository.FacultyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {
    private final FacultyRepository facultyRepository;

    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    public List<Faculty> findAll() {
        return facultyRepository.findAll();
    }

    public Optional<Faculty> findById(Long id) {
        return facultyRepository.findById(id);
    }

    public Faculty save(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    public void deleteById(Long id) {
        facultyRepository.deleteById(id);
    }

    public Faculty update(Long id, Faculty facultyDetails) {
        return facultyRepository.findById(id).map(faculty -> {
            faculty.setFirstName(facultyDetails.getFirstName());
            faculty.setLastName(facultyDetails.getLastName());
            faculty.setEmail(facultyDetails.getEmail());
            faculty.setDepartment(facultyDetails.getDepartment());
            faculty.setDesignation(facultyDetails.getDesignation());
            return facultyRepository.save(faculty);
        }).orElseThrow(() -> new RuntimeException("Faculty member not found with id " + id));
    }
}