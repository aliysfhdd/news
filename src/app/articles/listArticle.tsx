'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import useDebounce, { useInfiniteScrollRef } from "@/hooks";
import { IResult } from "@/interface/article";
import Link from "next/link";
import Article from "@/app/articles/article";
import {getCurrentBalance, initMoney, numberFormat} from "@/utils";
import styles from './listArticle.module.css';

const ITEM_PER_PAGE=10
const ListArticle = ({listData}:{listData:IResult[]}) => {
  const [currentBalance,setCurrentBalance]=useState(0)
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query)
  const [articleList, setArticleList] = useState<IResult[]>([]);
  const [lastElement, page] = useInfiniteScrollRef(articleList,debouncedQuery,listData);
  const showMore= articleList.length >= page * ITEM_PER_PAGE
  useEffect(() => {
    (async ()=> {
      if(page>1){
        setArticleList((prevState)=>[...prevState,...listData.slice((page-1) * ITEM_PER_PAGE,page * ITEM_PER_PAGE)])
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
    setArticleList(listData.slice(0,ITEM_PER_PAGE))
  },[listData])

  useEffect(() => {
    setArticleList(listData.filter((data)=>data.title.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0,ITEM_PER_PAGE))
  }, [debouncedQuery]);


  useEffect(() => {
    initMoney();
    setCurrentBalance(getCurrentBalance())
  }, []);

  return (
    <div>
      <div className={styles.balance}>
        <p>My Balance: {numberFormat(currentBalance)}</p>
      </div>
      <div className={styles.search}>
        <h2>Search Article</h2>
        <input onChange={handleSearch} placeholder={'Search title'}/>
      </div>
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
