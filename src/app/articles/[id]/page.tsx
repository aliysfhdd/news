'use client'
import React, { useEffect, useState } from 'react';
import {
	buyArticle,
	getArticleById,
	getCurrentBalance,
	isUserAlreadyBought,
	numberFormat,
	removeBoughtArticleById
} from "@/utils";
import { IMedia, IResult } from "@/interface/article";
import { useRouter } from "next/navigation";
import {E_BUY_ARTICLE} from "@/constants";
import styles from './page.module.css';


const Detail = ({
	params,
}: { params: { id: number }; })=>{
	const[currentBalance,setCurrentBalance]=useState(0)
	const[alreadyBought,setAlreadyBought]=useState(false)
	const router=useRouter()
	const [data, setData] = useState<IResult | null>(null);
	useEffect(() => {
		const res= getArticleById(params.id)
		if(res)setData(res)
		else {
			removeBoughtArticleById(params.id)
			alert('Oops! article that you find is not found')
			router.push('/articles')
		}
		if(isUserAlreadyBought(params.id)){
			setAlreadyBought(true)
		}
	}, []);
	const getImageUrl=(title:string,media:IMedia[])=>{
		let url=media.at(-1)?.["media-metadata"].at(-1)?.url
		if(url){
			return <img src={url} alt={title}/>
		}
		return null
	}

	const onClickBuy=(data:IResult)=>{
		let res= buyArticle(data);
		if(res===E_BUY_ARTICLE.INSUFFICIENT){
			alert("You didnt have enough money")
		}
		else if(res===E_BUY_ARTICLE.ALREADY){
			alert("You already buy this article")
		}
		else {
			alert('Success!')
			router.refresh()
		}
	}
	useEffect(()=>{
		setCurrentBalance(getCurrentBalance())
	},[])
	return (
		<div>
			{data &&
				<div className={styles.wrapperDetail}>
					<h2>{data.title}</h2>
					<p>{data.byline}</p>
					<p>{data.published_date.toString()}</p>
					{getImageUrl(data.title,data.media)}
					<p>{data.abstract}</p>
					<p>Source: {data.source}</p>
					{
						alreadyBought ? <button className={styles.buttonBuy} onClick={()=>open(data.url,'_blank')}>Read Article</button>:
							<div style={{display:'flex',alignItems:'center'}}>
								<button className={styles.buttonBuy} onClick={()=>onClickBuy(data)}>Buy {data.price==0 ? 'Free': numberFormat(data.price)}</button>
								<p>Current Balance: {numberFormat(currentBalance)}</p>
							</div>
					}

				</div>
			}
		</div>
	);
};

export default Detail;
