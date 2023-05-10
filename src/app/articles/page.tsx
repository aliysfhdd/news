import { fetchMostEmail, fetchMostShared, fetchMostViewed } from "@/api";
import ListArticle from "./ListArticle";
import { IResult } from "@/interface/article";

const Page = async ({
	searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined }}) => {
	const filter= searchParams['filter']
	const [email,shared,viewed]=await Promise.all([fetchMostEmail(30),fetchMostShared(30),fetchMostViewed(30)])
	let parsedData;
	if(filter==='email'){
		parsedData=email
	}
	else if(filter==='shared'){
		parsedData=shared
	}
	else if(filter==='viewed'){
		parsedData=viewed
	}
	else{
		parsedData=[...email,...shared,...viewed].reduce(function (p:IResult[], c:IResult) {
			if (!p.some(function (el) { return el.id === c.id; })) p.push(c);
			return p;
		  }, []);
	}

	return(
		<>
		<ListArticle listData={parsedData} filter={filter}/>
		</>
	)
	
};

export default Page;
