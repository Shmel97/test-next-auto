import type {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	FC,
	ReactNode,
} from 'react';
import styles from './Button.module.scss';

interface ButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<button {...props} className={styles.btn}>
			{children}
		</button>
	);
};
