'use client';

import { Button } from '@/shared/UI/Button/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
	hasNextPage: boolean;
	hasPrevPage: boolean;
};

export const Pagination: FC<PaginationProps> = ({
	hasNextPage,
	hasPrevPage,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const page = searchParams.get('page') ?? '1';
	const per_page = searchParams.get('per_page') ?? '5';
	return (
		<div className={styles.pagination}>
			<Button
				disabled={!hasPrevPage}
				onClick={() => {
					router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
				}}
			>
				Назад
			</Button>
			<div className={styles.pagination__info}>{page}</div>
			<Button
				disabled={!hasNextPage}
				onClick={() => {
					router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
				}}
			>
				Вперед
			</Button>
		</div>
	);
};
