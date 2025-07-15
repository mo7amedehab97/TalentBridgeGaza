import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Only send the required fields to the Express API
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role
    } = data;
    const payload = { firstName, lastName, email, phoneNumber, password, role };
    // Proxy the request to the external Express API
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup",
      payload,
      { withCredentials: true }
    );
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Registration failed";
    return NextResponse.json(
      { success: false, message },
      { status: error.response?.status || 500 }
    );
  }
} 