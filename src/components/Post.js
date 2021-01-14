import { Avatar } from '@material-ui/core';
import React from 'react';
import './Post.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import InputOption from './InputOption';
import like from '../images/like.svg';

const Post = ({
  id,
  name,
  description,
  message,
  photUrl,
  likeCount,
  increaseLikeCount,
}) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar src={photUrl}>{name[0]}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="post__body">
        <p>{message}</p>
        <div className="post__likecounts">
          <img src={like} alt="like" />
          <span>{likeCount}</span>
        </div>
      </div>

      <div className="post__likecounts"></div>
      <div className="post__buttons">
        <InputOption
          title="Like"
          Icon={ThumbUpAltOutlinedIcon}
          color="gray"
          onClick={() => increaseLikeCount(id)}
        />
        <InputOption title="Comment" Icon={ChatOutlinedIcon} color="gray" />
        <InputOption title="Share" Icon={ShareOutlinedIcon} color="gray" />
        <InputOption title="Send" Icon={SendOutlinedIcon} color="gray" />
      </div>
    </div>
  );
};

export default Post;
