// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
//     publicRoutes:["/"],
// });

// export const config = {
// matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  // This is a protected route
  '/dashboard'
]);


export default clerkMiddleware((auth,req)=>{
  if(isProtectedRoute(req)){
    auth().protect();
  }
  return NextResponse.next();
})

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};