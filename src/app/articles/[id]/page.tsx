'use client'
import React, { useEffect, useState } from 'react';
import { buyArticle, getArticleById } from "@/utils";
import { IMedia, IResult } from "@/interface/article";
import { useRouter } from "next/navigation";

const Detail = ({
	params,
}: { params: { id: number }; })=>{
	const router=useRouter()
	const [data, setData] = useState<IResult | null>(null);
	useEffect(() => {
		const res= getArticleById(params.id)
		if(res)setData(res)
		else router.push('/articles')
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
		if(res==='Fail'){
			alert("You didnt have enough money")
		}
		else if(res==="Already"){
			alert("You already buy this article")
		}
		else {
			alert('Success!')
		}
	}
	return (
		<div>
			{data &&
				<div>
					<p>{data.title}</p>
					<p>{data.abstract}</p>
					<p>{data.source}</p>
					<p>{data.byline}</p>
					<p>{data.published_date.toString()}</p>
					{getImageUrl(data.title,data.media)}
					<button onClick={()=>onClickBuy(data)}>Buy</button>
				</div>
			}
		</div>
	);
};

export default Detail;
