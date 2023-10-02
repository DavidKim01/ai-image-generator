import { Leap } from "@leap-ai/sdk";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const modelId = "1e7737d7-545e-469f-857f-e4b46eaa151d"; // Model: OpenJourney v4
  const apiKey = process.env.LEAP_API_KEY as string;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Invalid request. Check model." },
      { status: 400 }
    );
  }

  const leap = new Leap(apiKey);
  const { data, error } = await leap.generate.listInferenceJobs({
    modelId,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}