import React from 'react';

// CSS
import styles from '../Styles.module.css';

// Types
type RoleFilterItemProps = {
	roleName: string;
	roleFilter: string | undefined;
	setRoleFilter(role: string): void;
};

const RoleFilterItem = (props: RoleFilterItemProps) => {
	const { roleName, roleFilter, setRoleFilter } = props;

	return (
		<li>
			<span
				onClick={() => setRoleFilter(roleName)}
				className={roleName === roleFilter ? styles.selectedFilter : undefined}
			>
				{/* Capitalize First Letter */}
				{roleName.charAt(0).toUpperCase() + roleName.slice(1)}
			</span>
		</li>
	);
};

export default RoleFilterItem;
