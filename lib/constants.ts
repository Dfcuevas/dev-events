// Centralized event data for cards, lists, and detail pages
// Images reference files under public/images so they can be used directly with next/image

export type EventItem = {
  title: string;
  image: string; // path starting with "/images/..."
  slug: string;
  location: string;
  date: string; // ISO-like or human-readable date string
  time: string; // e.g., "09:00 AM – 5:00 PM"
};

export const events: EventItem[] = [
  {
    title: "React Summit 2025",
    image: "/images/event1.png",
    slug: "react-summit-2025",
    location: "Amsterdam, NL",
    date: "June 12, 2025",
    time: "09:00 AM – 6:00 PM",
  },
  {
    title: "JSNation 2025",
    image: "/images/event2.png",
    slug: "jsnation-2025",
    location: "Amsterdam, NL",
    date: "June 11, 2025",
    time: "09:30 AM – 5:30 PM",
  },
  {
    title: "Next.js Conf 2025",
    image: "/images/event3.png",
    slug: "nextjs-conf-2025",
    location: "San Francisco, CA, USA",
    date: "October 21, 2025",
    time: "10:00 AM – 6:00 PM",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2025",
    image: "/images/event4.png",
    slug: "kubecon-na-2025",
    location: "Salt Lake City, UT, USA",
    date: "November 18–21, 2025",
    time: "All Day",
  },
  {
    title: "AWS re:Invent 2025",
    image: "/images/event5.png",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, NV, USA",
    date: "December 1–5, 2025",
    time: "Keynotes & Breakouts",
  },
  {
    title: "HackZurich 2025",
    image: "/images/event6.png",
    slug: "hackzurich-2025",
    location: "Zurich, Switzerland",
    date: "September 19–21, 2025",
    time: "48-hour Hackathon",
  },
  {
    title: "Google Cloud Next 2026",
    image: "/images/event2.png",
    slug: "google-cloud-next-2026",
    location: "San Francisco, CA, USA",
    date: "April 7–9, 2026",
    time: "All Day",
  },
  {
    title: "PyCon US 2026",
    image: "/images/event3.png",
    slug: "pycon-us-2026",
    location: "Pittsburgh, PA, USA",
    date: "May 15–23, 2026",
    time: "Talks & Tutorials",
  },
];
