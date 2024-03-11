'use client';

import clsx from 'clsx';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import styles from './AppLink.module.scss';

type AppLinkProps = {
	className?: string;
	href: string;
	children: ReactNode;
	onClick?: () => void;
};

export const AppLink: FC<AppLinkProps> = ({ children, href, className }) => {
	return (
		<Link href={href} className={clsx(styles.link, className)}>
			{children}
		</Link>
	);
};
