import Loading from "@/components/loading";
import { Suspense } from "react";

export const metadata = {
  title: 'Lucky Draw',
  description: 'Lucky draw to get points!',
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
