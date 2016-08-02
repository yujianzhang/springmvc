package com.fc.ssm.entity.auth;

import java.io.Serializable;

/**
 */
public class UserRole extends BaseEntity implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = -6251745024137605473L;
	private Long id;
    private Long userId;
    private Long roleId;

    public UserRole(Long id, Long userId, Long roleId) {
        this.id = id;
        this.userId = userId;
        this.roleId = roleId;
    }

    public UserRole() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
