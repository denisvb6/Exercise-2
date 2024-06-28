import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const onForwardClick = () => {
		setActiveIndex((activeIndex) => activeIndex + 1);

		if(activeIndex >= 5){
			document.querySelector('#btn').innerHTML = 'Начать сначала';
			setActiveIndex(6);
		}
	}

	const onBackClick = () => {
		if(activeIndex > 0){
			setActiveIndex((activeIndex) => activeIndex - 1);
			document.querySelector('#btn').innerHTML = 'Далее';
		}
	}

	const onStartOverClick = () => {
		if(activeIndex < 6){
			setActiveIndex((activeIndex) => activeIndex + 1);
		} else {
			setActiveIndex(0);
			document.querySelector('#btn').innerHTML = 'Далее';
		}

		if(activeIndex === 5){
			document.querySelector('#btn').innerHTML = 'Начать сначала';
		}
	}


	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let start = true;
	let end = false;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles.stepsContent}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex].content}
					</div>
					<ul className={styles.stepsList}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}

						{ steps.map( ( {id, title} ) => (

							(Number(id) === activeIndex + 1) ?
							<li key={id} className={styles.stepsItem + ' ' + styles.done + ' ' + styles.active}>
								<button onClick={onForwardClick} className={styles.stepsItemButton}>{Number(id)}</button>{title}</li> :

								( Number(id) <= activeIndex + 1) ?
								<li key={id} className={styles.stepsItem + ' ' + styles.done}>
									<button onClick={onBackClick} className={styles.stepsItemButton}>{Number(id)}</button>{title}</li> :
								<li key={id} className={styles.stepsItem}>
									<button onClick={onForwardClick} className={styles.stepsItemButton}>{Number(id)}</button>{title}</li>
							) )
						}
					</ul>
					<div className={styles.buttonsContainer}>
						<button onClick={onBackClick} className={styles.button}>Назад</button>
						<button onClick={onStartOverClick} id='btn' className={styles.button}>
							Далее
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}

						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
