import { fetchArticleByWebURL } from '@/api';
import React from 'react';

const Detail = async ({
	params,
}: { params: { id: string }; })=>{
	const res= await fetchArticleByWebURL(decodeURIComponent(params.id))
	return (
		<div>
			{JSON.stringify(res)} 
		</div>
	);
};

export default Detail;
