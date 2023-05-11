
import { Suspense } from "react";
import Loading from "@/components/loading";
export const metadata = {
	title: 'Article Detail',
	description: 'Detail Article from NYTimes',
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
