import Loading from "@/components/loading";
import { Suspense } from "react";

export const metadata = {
	title: 'My Article',
	description: 'List of Article that already bought',
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
