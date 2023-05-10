import {IResult} from "../../interface/article"
import Link from 'next/link';

const Article =({data}:{data:IResult})=>{
    return (
        <div style={{height:'200px'}}>
            <Link href={`/detail/${encodeURIComponent(data.uri)}`}>
            Article {data.title} {data.id}
            </Link>
        </div>
    )
}

export default Article