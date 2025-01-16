import React from 'react';
import './Widgets.css';
import assets from '../../assets/Assets.js';

function Widgets() {
  return (
	<div className="widgets">
		<div className="widgets__container">
			<div className="widgets__item">
				<div className="widgets__item__content">
					<img src={assets.appLogo} alt="Logo" className='widgets__item__content__image' />
				</div>
				<div className="widgets__item__title">Good News! WE are live on web</div>
			</div>
			<div className="widgets__item">
				<div className="widgets__item__content">
					<img src={assets.psm2} alt="Logo" className='widgets__item__content__image' />
				</div>
				<div className="widgets__item__title">Great News! Web site is going great</div>
			</div>
			<div className="widgets__item">
				<div className="widgets__item__content">
					<img src={assets.psm3} alt="Logo" className='widgets__item__content__image' />
				</div>
				<div className="widgets__item__title">And we are still under Development! Wish Luck</div>
			</div>
		</div>
	</div> 
  );
}

export default Widgets;