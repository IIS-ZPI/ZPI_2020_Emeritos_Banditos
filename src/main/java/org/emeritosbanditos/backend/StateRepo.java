package org.emeritosbanditos.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepo extends JpaRepository<State,Integer> {
    State findByName(String state);
}
