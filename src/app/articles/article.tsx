import {IResult} from "../../interface/article"
import Link from 'next/link';
import {numberFormat} from "@/utils";

const Article =({data}:{data:IResult})=>{
    return (
        <div style={{height:'200px'}}>
            <Link href={`/articles/${data.id}`}>
                <h4>{data.title}</h4>
                <h5>Price: {data.price==0 ? 'Free':numberFormat(data.price)}</h5>
                <h6>Section: {data.section}{data.subsection && `, ${data.subsection}`}</h6>
                <h6>Source: {data.source}</h6>
            </Link>
        </div>
    )
}

export default Article
