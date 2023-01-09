import { memo, useState } from "react";
import { useEffect } from "react";
import hyRequest from "@airbnb/services";  

 const Home = memo(
  () => {
    const [highscore,setHighScore] = useState({} as any)

    useEffect(()=>{
      hyRequest.get({url:"/home/highscore"}).then(res =>{
        console.log(res);
        setHighScore(res)
        console.log(highscore);
        
      })
    },[])
 
    return (
      <>
        <header>首页</header>
        <h2>{highscore.title}</h2>
        <ul>
          {
            highscore?.list?.map((item,index) => <li key={item.id}>{index} <br /> {item.name}</li>)
          }
        </ul>
      </>
    );
  }
);

export default Home;