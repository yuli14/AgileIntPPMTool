package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//need to mark as repository, otherwise it will save to database, but not with uniqueness
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

//
    User findByUsername(String username);
//    newest findById, this returns an optional, prevents npe
    User getById(Long id);


}
