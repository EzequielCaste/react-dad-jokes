import React, { useEffect, useState } from "react";
import { Joke } from "./Joke";
import "./JokeList.css";

export const JokeList = () => {
  const defaultProps = {
    maxJokes: 10
  };
  const [jokes, setJokes] = useState(
    JSON.parse(window.localStorage.getItem("jokes") || "[]")
  );
  const [loading, setLoading] = useState(false);

  const seenJokes = new Set(jokes.map((j) => j.joke));

  useEffect(() => {
    if (jokes.length === 0) {
      getJokes();
    }
  }, []);

  const getJokes = async () => {
    try {
      let newJokes = [];

      const fetchJokes = async () => {
        while (newJokes.length < defaultProps.maxJokes) {
          let res = await fetch("https://icanhazdadjoke.com/", {
            headers: {
              Accept: "application/json"
            }
          });

          let data = await res.json();
          let newJoke = data.joke;
          if (!seenJokes.has(newJoke)) {
            newJokes.push({ joke: newJoke, votes: 0, id: data.id });
          } else {
          }
          //console.log(jokes);
        }
        setJokes([...jokes, ...newJokes]);
        setLoading(false);
        window.localStorage.setItem("jokes", JSON.stringify(newJokes));
      };
      fetchJokes();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleVote = (id, change) => {
    const newArray = jokes.map((j) =>
      j.id === id ? { ...j, votes: j.votes + change } : j
    );
    setJokes(newArray);
    window.localStorage.setItem("jokes", JSON.stringify(newArray));
  };

  const handleClick = () => {
    setLoading(true);
    getJokes();
  };

  if (loading) {
    return (
      <div className="JokeList-spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="JokeList-title">Loading...</h1>
      </div>
    );
  }

  let sortedJokes = jokes.sort((a, b) => b.votes - a.votes);
  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Bad</span> Jokes
        </h1>
        <img
          className="shake-slow"
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          alt="laugh"
        />
        <button onClick={handleClick} className="JokeList-getmore">
          New Jokes
        </button>
      </div>

      <div className="JokeList-jokes">
        {sortedJokes.map((j) => (
          <Joke
            id={j.id}
            upvote={() => handleVote(j.id, 1)}
            downvote={() => handleVote(j.id, -1)}
            key={j.id}
            votes={j.votes}
            text={j.joke}
          />
        ))}
      </div>
    </div>
  );
};
