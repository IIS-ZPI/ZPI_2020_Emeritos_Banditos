package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StateRepo extends JpaRepository<State,Integer> {
    State findByName(String state);
}
