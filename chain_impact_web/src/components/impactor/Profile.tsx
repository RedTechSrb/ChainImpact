import React from 'react'

export default function Profiles({ Leaderboard }: any) {
  return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
  )
}

function Item(data: any){
    return (

        <>
            {
                data.map((value: any, index: any) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={value.img} alt="" />
            
                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>    
                                <span>{value.address}</span>
                            </div>                
                        </div>
                        <div className="item">
                            <span>{value.amount}</span>
                        </div>
                    </div>
                    )
                )
            }
        </>

        
    )
}