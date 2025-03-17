import styles from './style.module.scss';

const Preloader = () => {
	return(
		<div className={styles.preloader}>
			<div className={styles.preloader_wrap}>
				<span className={styles.preloader_wrap_element}></span>
				<span className={styles.preloader_wrap_element}></span>
				<span className={styles.preloader_wrap_element}></span>
			</div>
		</div>
	)
}

export default Preloader;
