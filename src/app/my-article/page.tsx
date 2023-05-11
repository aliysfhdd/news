'use client'
import React, { useEffect, useState } from 'react';
import { getMyBoughtArticle } from "@/utils";
import { IResult } from "@/interface/article";
import ListArticle from "@/app/articles/listArticle";

const MyArticle = () => {
  const [listData, setListData] = useState<IResult[]>([]);
  useEffect(() => {
    setListData(getMyBoughtArticle())
  }, []);

  return (
    <div>
      <ListArticle listData={listData}></ListArticle>
    </div>
  );
};

export default MyArticle;
