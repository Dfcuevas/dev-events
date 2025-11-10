import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";
import { IEvent } from "@/database/event.model";

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 *
 * @param request - Next.js request object
 * @param params - Route parameters containing the slug
 * @returns Event data or error response
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  try {
    // Validate slug parameter exists
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug parameter is required" },
        { status: 400 },
      );
    }

    // Validate slug format (alphanumeric and hyphens only)
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugPattern.test(slug)) {
      return NextResponse.json(
        {
          message:
            "Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens",
        },
        { status: 400 },
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug }).lean<IEvent>();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 },
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 },
    );
  } catch (error) {
    // Log error for debugging (server-side only)
    console.error("Error fetching event by slug:", error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}
