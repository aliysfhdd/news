'use client';

import useDebounce, { useInfiniteScrollRef } from "@/hooks";
import { IResult } from "@/interface/article";
import { useEffect, useRef, useState } from "react";
import Article from "./article";
import Link from "next/link";

const ListArticle =({listData,filter}:{listData:IResult[],filter:string})=>{
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query)
	const [articleList, setArticleList] = useState<IResult[]>([]);
	const [lastElement, page, doReset] = useInfiniteScrollRef(articleList,debouncedQuery,listData);
	const [isLoading, setIsLoading] = useState(false);
	const showMore= articleList.length >= page * 10
	useEffect(() => {
		(async ()=> {
            if(page>1){
                setArticleList((prevState)=>[...prevState,...listData.slice((page-1) * 10,page * 10)])
            }
		})()
	}, [page]);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}

    useEffect(()=>{
        setArticleList(listData.slice(0,10))
    },[listData])

	return (
		<div>
			<h2>Search Article</h2> {articleList.length}
            <Link href={'/articles?filter=email'} replace>email</Link>
			<input onChange={handleSearch}/>
			<div>
				{articleList && articleList.map((data) => <Article key={data.id} data={data}/>)}
			</div>
			{showMore &&
			<div ref={lastElement}>Loadingg</div>
			}
			{isLoading && !showMore &&
            <div>Loadingg</div>
			}
		</div>
	)
}

export default ListArticle