import { NextRequest, NextResponse } from "next/server";

//some common scenarios where Proxy is effective inclue:

//Modifying headers for all pages or a subset of pages
//Rewriting to different pages based on A/B tests or experiments
//Programatic redirects based on incoming request properties

//authentication?

export function proxy(request:NextRequest){
    if (request.nextUrl.pathname.startsWith("/admin")){
        return NextResponse.redirect(new URL("/",request.url))
    }
    return NextResponse.next()
}

export const config={
    // matcher:"/about/:path*",
    matcher:[
        //Exclud API routes, static files, image optimization, and .png files
        "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    ]
}