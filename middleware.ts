import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log(request.url);
    console.log(request.cookies)
    return NextResponse.next();
}