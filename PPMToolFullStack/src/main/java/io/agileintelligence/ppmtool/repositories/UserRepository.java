package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {


}
