import React from 'react';
import './Widgets.css';
import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Widgets() {
  const newsArticle = (heading, subtittle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtittle}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle('Bitcoin hits all time high', 'Top news - 10000 readers')}
      {newsArticle('Tesla hits new highs', 'Top news - 20000 readers')}
      {newsArticle(
        'Coronavirus: Australia updates',
        'Top news - 14000 readers'
      )}
      {newsArticle('Is React too good?', 'Top news - 2000 readers')}
    </div>
  );
}

export default Widgets;
