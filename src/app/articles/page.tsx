'use client';
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {fetchSearchArticle} from "../../api";
import useDebounce, {useInfiniteScrollRef} from "../../hooks";

const Page = () => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query)
	const [articleList, setArticleList] = useState([]);
	const hasReachEnd = useRef(false);
	const [lastElement, page, doReset] = useInfiniteScrollRef(articleList,debouncedQuery,hasReachEnd.current);
	const [isLoading, setIsLoading] = useState(false);
	const showMore= articleList.length >= page * 10
	useEffect(() => {
		(async ()=> {
			if(doReset) return
			setIsLoading(true)
			const resp= await fetchSearchArticle(debouncedQuery,page)
			if(resp){
				const results=resp.response.docs
				setArticleList((prevState)=>[...prevState,...results])
			}
			setIsLoading(false)
		})()
	}, [page,doReset]);

	useEffect(() => {
		setArticleList([])
	}, [debouncedQuery]);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}

	return (
		<div>
			<h2>Search Article</h2>
			<input onChange={handleSearch}/>
			<div>
				{articleList && articleList.map((data) => <div>{data.uri}</div>)}
			</div>
			{showMore &&
			<div ref={lastElement}>Loadingg</div>
			}
			{isLoading && !showMore &&
            <div>Loadingg</div>
			}
		</div>
	)
};

export default Page;
