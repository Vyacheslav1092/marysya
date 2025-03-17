import styles from './style.module.scss'
import CloseIcon from "../../../public/img/svg/close-large.svg";
import {InitialTrailer} from "@/models/api/movies/initialTrailer";


const VueTrailer = ({trailerSrc, onClose}: InitialTrailer) => {
	
	const embedUrl = `https://www.youtube.com/embed/${trailerSrc.trailerYoutubeId}`;
	
	return (
		<div className={styles.trailer}>
			<div className={styles.trailer_inner}>
				<button className={styles.trailer_inner__close} onClick={onClose}>
					<CloseIcon/>
				</button>
				<iframe 
					className={styles.trailer_inner__video} 
					src={embedUrl}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				></iframe>
				{/*<button className={styles.trailer_inner__play}>*/}
				{/*	<div className={animationButton.pause}>*/}
				{/*		<div className={animationButton.line + ' ' + animationButton.line_1}></div>*/}
				{/*		<div className={animationButton.line + ' ' + animationButton.line_2}></div>*/}
				{/*	</div>*/}
				{/*	<div className={animationButton.play + ' ' + animationButton.active}>*/}
				{/*		<div className={animationButton.line + ' ' + animationButton.line_1}></div>*/}
				{/*		<div className={animationButton.line + ' ' + animationButton.line_2}></div>*/}
				{/*		<div className={animationButton.line + ' ' + animationButton.line_3}></div>*/}
				{/*	</div>*/}
				{/*</button>*/}
				{/*<span className={styles.trailer_inner__info}>*/}
				{/*	Шерлок Холмс и доктор Ватсон: Знакомство*/}
				{/*</span>*/}
			</div>
		</div>
	)
}

export default VueTrailer;
