
import { Suspense } from "react";
import Loading from "@/components/loading";
export const metadata = {
	title: 'List Article',
	description: 'List Article from NYTimes',
}
const Layout = async ({
	children,
}: { children: React.ReactNode}) => {

	return(
			<Suspense fallback={<Loading/>}>
				{children}
			</Suspense>
	)

};

export default Layout;
