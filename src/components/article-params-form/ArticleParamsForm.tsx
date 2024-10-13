import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	stateArticle: ArticleStateType;
	setStateArticle: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	stateArticle,
	setStateArticle,
}: ArticleParamsFormProps) => {
	const [stateArrowButton, setStateArrowButton] = useState(false);
	const toogleArrowButton = (arg: boolean): boolean => {
		const res = arg ? false : true;
		return res;
	};
	const rootRef = useRef<HTMLDivElement>(null);
	const menuStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: stateArrowButton,
	});

	const [stateSelectArticle, setStateSelectArticle] =
		useState<ArticleStateType>(stateArticle);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setStateSelectArticle({ ...stateSelectArticle, [key]: value });
	};
	useOutsideClickClose({
		isOpen: stateArrowButton,
		rootRef,
		onClose: () => setStateArrowButton(false),
		onChange: setStateArrowButton,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={stateArrowButton}
				onClick={() => {
					setStateArrowButton(toogleArrowButton(stateArrowButton));
				}}
			/>
			<aside className={menuStyle}>
				<form
					className={clsx(styles.form)}
					onSubmit={(e) => {
						e.preventDefault();
						setStateArticle(stateSelectArticle);
					}}>
					<Text uppercase={true} size={31} weight={800}>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={stateSelectArticle.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='шрифт'
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={stateSelectArticle.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title={'рАЗМЕР шрифта'}
					/>
					<Select
						selected={stateSelectArticle.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={stateSelectArticle.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						selected={stateSelectArticle.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => setStateSelectArticle(defaultArticleState)}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
