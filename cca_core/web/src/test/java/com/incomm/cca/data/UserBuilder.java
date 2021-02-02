package com.incomm.cca.data;

import com.incomm.cca.model.domain.User;

/**
 * Created by Allen on 12/15/2016.
 */
public class UserBuilder {
	
	public static User ofUsername( String username ) {
		User user = new User();
		user.setUsername( username );
		return user;
	}
}
