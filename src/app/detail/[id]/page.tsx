import React from 'react';

const Detail = ({
	params,
}: { params: { id: string }; })=>{
	return (
		<div>
			id {params.id}
		</div>
	);
};

export default Detail;
