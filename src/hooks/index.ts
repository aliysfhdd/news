import { useEffect, useRef, useState } from "react";

export const useInfiniteScrollRef = (image:any[],query:string, listData:any[]): [React.MutableRefObject<Element | undefined>, number] => {
	const compRef = useRef<Element>();
	const [page, setPage] = useState<number>(1);
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setTimeout(()=>{
					setPage((prevState) => prevState + 1)
				},1000)
			}
		});
		if (compRef.current && typeof observer.observe == "function") observer.observe(<Element>compRef.current);
		return () => {
			if (compRef.current) observer.unobserve(<Element>compRef.current);
		};
	}, [image]);

	useEffect(() => {
		setPage(1)
	}, [query,listData]);

	return [compRef, page];
};

const useDebounce=(value: string)=>{
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), 500)
		return () => {
			clearTimeout(timer)
		}
	}, [value])

	return debouncedValue
}

export default useDebounce
