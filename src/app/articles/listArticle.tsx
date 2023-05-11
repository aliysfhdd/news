'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import useDebounce, { useInfiniteScrollRef } from "@/hooks";
import { IResult } from "@/interface/article";
import Link from "next/link";
import Article from "@/app/articles/article";
import { initMoney } from "@/utils";

const ListArticle = ({listData}:{listData:IResult[]}) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query)
  const [articleList, setArticleList] = useState<IResult[]>([]);
  const [lastElement, page] = useInfiniteScrollRef(articleList,debouncedQuery,listData);
  const showMore= articleList.length >= page * 10
  useEffect(() => {
    (async ()=> {
      if(page>1){
        setArticleList((prevState)=>[...prevState,...listData.slice((page-1) * 10,page * 10)])
      }
    })()
  }, [page]);

  useEffect(() => {
    let articleData=localStorage.getItem('articles');
    if(!articleData || JSON.parse(articleData).length< listData.length){
      localStorage.setItem('articles', JSON.stringify([...listData]))
    }
  }, [listData]);


  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(()=>{
    setArticleList(listData.slice(0,10))
  },[listData])

  useEffect(() => {
    setArticleList(listData.filter((data)=>data.title.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0,10))
  }, [debouncedQuery]);


  useEffect(() => {
    initMoney()
  }, []);

  return (
    <div>
      <h2>Search Article</h2>
      <input onChange={handleSearch}/>
      <div>
        {articleList && articleList.map((data) => <Article key={data.id} data={data}/>)}
      </div>
      {showMore &&
        // @ts-ignore
        <div ref={lastElement}>Loading..</div>
      }
    </div>
  )
};

export default ListArticle;
