import React from "react";
import "./Joke.css";

export const Joke = ({ id, votes, text, upvote, downvote }) => {
  const getColor = () => {
    if (votes >= 15) {
      return "#4CAF50";
    } else if (votes >= 12) {
      return "#8BC34A";
    } else if (votes >= 9) {
      return "#CDDC39";
    } else if (votes >= 6) {
      return "#FFEB3B";
    } else if (votes >= 3) {
      return "#FFC107";
    } else if (votes >= 0) {
      return "#FF9800";
    } else {
      return "#F44336";
    }
  };
  const getEmoji = () => {
    if (votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 12) {
      return "em em-laughing";
    } else if (votes >= 9) {
      return "em em-smiley";
    } else if (votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 3) {
      return "em em-neutral_face";
    } else if (votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  };

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i onClick={upvote} className="fas fa-arrow-up"></i>
        <div className="Joke-votes" style={{ borderColor: getColor() }}>
          {votes}
        </div>
        <i onClick={downvote} className="fas fa-arrow-down"></i>
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley">
        <i className={getEmoji()}></i>
      </div>
    </div>
  );
};
