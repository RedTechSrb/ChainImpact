import React, { useEffect, useState } from 'react'
import './style.css';
import Profiles from './Profile';
import { Leaderboard } from './database';
import Pagination from '../pagination/Pagination';

export default function Impactors({company}: any) {

    const [period, setPeriod] = useState(0);
    const [coinsData, setCoinsData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);

  const handleClick = (e: any) => {
     
    //setPeriod(e.target.dataset.id)
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    setCoinsData(Leaderboard);
  }, []);

  return (
    <div className="board">
        <h1 className='leaderboard'>{company === true ? "Company" : "Private user"}</h1>

        <div className="duration">
            {/*<button onClick={handleClick} data-id='7'>7 Days</button>
            <button onClick={handleClick} data-id='30'>30 Days</button>*/}
            <button onClick={handleClick} data-id='0'>All-Time</button>
        </div>

        <Profiles Leaderboard={between(currentPosts, period)}></Profiles>
        <Pagination className="pagination"
                totalPosts={Leaderboard.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />

    </div>
  )
}



function between(data: any[], between: number){
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter(val => {
        let userDate = new Date(val.dt);
        if (between === 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort with asending order
    return filter.sort((a, b) => {
        if ( a.amount === b.amount){
            return b.amount - a.amount;
        } else{
            return b.amount - a.amount;
        }
    })

}