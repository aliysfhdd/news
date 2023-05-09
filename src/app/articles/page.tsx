'use client';
import React, {useEffect, useState} from 'react';
import {fetchSearchArticle} from "../../api";

const Page = () => {
	const [page,setPage]=useState(1)
	useEffect(
		()=>{
			fetchSearchArticle(page)
		},[page]
	)
	return (
		<div>
			<button onClick={()=>setPage((prev)=>prev+1)}>Mana</button>
		</div>
	);
};

export default Page;
