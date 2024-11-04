import moment from "moment";
import { v4 as uuid } from "uuid";

let tasks = [
  {
    title: "Plan project timeline",
    description: "Create a detailed timeline for the project phases.",
  },
  {
    title: "Set up Docker environment",
    description:
      "Configure Docker containers for front-end and back-end services.",
  },
  {
    title: "Research MongoDB indexes",
    description:
      "Look into optimizing queries by adding proper indexes in MongoDB.",
  },
  {
    title: "Write API documentation",
    description: "Document the API endpoints for future reference.",
    status: "pending",
  },
  {
    title: "Design the homepage",
    description: "Create wireframes and a UI design for the landing page.",
  },
  {
    title: "Integrate Express.js with MongoDB",
    description: "Set up a MongoDB connection in the Express.js API.",
  },
  {
    title: "Fix frontend responsive issues",
    description: "Resolve layout issues when viewing on mobile devices.",
  },
  {
    title: "Optimize site performance",
    description: "Analyze and optimize load times across all pages.",
  },
  {
    title: "Test API routes",
    description: "Ensure all API routes are functioning as expected.",
  },
  {
    title: "Set up user authentication",
    description: "Implement authentication using JWT for the Express.js API.",
  },
  {
    title: "Grocery Shopping",
    description: "Buy milk, eggs, bread, and fresh vegetables.",
  },
  {
    title: "Morning Workout",
    description:
      "Complete a 30-minute workout session including cardio and stretching.",
  },
  {
    title: "Read a Book",
    description: "Spend at least an hour reading a new book.",
  },
  {
    title: "Organize Desk",
    description:
      "Clear out unnecessary items and arrange books and papers neatly.",
  },
  {
    title: "Water Plants",
    description: "Water all indoor and outdoor plants.",
  },
  { title: "Laundry", description: "Wash and dry a load of clothes." },
  {
    title: "Pay Bills",
    description: "Settle electricity, water, and internet bills online.",
  },
  { title: "Meal Prep", description: "Prepare meals for the next three days." },
  {
    title: "Catch Up with Friend",
    description: "Call or message an old friend to check in.",
  },
  {
    title: "Practice Guitar",
    description: "Play guitar for 30 minutes, focusing on chord progressions.",
  },
  {
    title: "Clean Kitchen",
    description: "Wipe down counters, mop floor, and organize cabinets.",
  },
  {
    title: "Meditation",
    description: "Spend 15 minutes in meditation or breathing exercises.",
  },
  {
    title: "Update Budget",
    description: "Review and update monthly budget with recent expenses.",
  },
  {
    title: "Plan Vacation",
    description: "Research destinations and create a tentative travel plan.",
  },
  {
    title: "Declutter Closet",
    description:
      "Remove clothes that haven't been worn recently and donate them.",
  },
  {
    title: "Send Email",
    description: "Reply to all pending emails and clear inbox.",
  },
  {
    title: "Work on Project",
    description: "Dedicate two hours to progressing on the current project.",
  },
  {
    title: "Journal Entry",
    description: "Write down thoughts and reflections for the day.",
  },
  {
    title: "Go for a Walk",
    description: "Take a 20-minute walk in the neighborhood.",
  },
  { title: "Clean Car", description: "Wash and vacuum the car." },
  {
    title: "Check Social Media",
    description: "Update profile and catch up on friend updates.",
  },
  {
    title: "Research New Skills",
    description: "Look up tutorials or courses on a skill to learn.",
  },
  {
    title: "Organize Photos",
    description: "Sort and label recent photos in an album.",
  },
  {
    title: "Prepare Presentation",
    description:
      "Create slides and organize points for an upcoming presentation.",
  },
  {
    title: "Order Groceries Online",
    description: "Order necessary groceries for delivery.",
  },
  {
    title: "Write Thank-You Note",
    description: "Write a thank-you note for a recent gift or favor.",
  },
  {
    title: "Clean Living Room",
    description: "Dust, vacuum, and organize the living room.",
  },
  {
    title: "Learn a New Recipe",
    description: "Research and try out a new recipe for dinner.",
  },
  {
    title: "Exercise Routine",
    description: "Complete a strength and flexibility workout.",
  },
  {
    title: "Update Resume",
    description: "Add recent experience and achievements to resume.",
  },
  {
    title: "Visit Library",
    description: "Borrow a few new books or return overdue ones.",
  },
  {
    title: "Check Credit Score",
    description: "Review recent credit activity and check score.",
  },
  { title: "Clean Bathroom", description: "Scrub shower, sink, and toilet." },
  {
    title: "Organize Garage",
    description: "Clear out old items and make space in the garage.",
  },
  {
    title: "Catch Up on News",
    description: "Read or watch news highlights from the past week.",
  },
  {
    title: "Listen to Podcast",
    description: "Tune into a new episode of a favorite podcast.",
  },
  {
    title: "Set Goals for the Month",
    description: "Write down key goals to achieve this month.",
  },
  {
    title: "Backup Files",
    description: "Backup important files to an external drive or cloud.",
  },
  {
    title: "Call Parents",
    description: "Catch up with parents over the phone.",
  },
  {
    title: "Tidy Bedroom",
    description: "Make bed, dust surfaces, and tidy personal items.",
  },
  {
    title: "Sort Receipts",
    description: "Organize recent receipts and file away.",
  },
  {
    title: "Practice Language Skills",
    description: "Spend 20 minutes practicing a new language.",
  },
  {
    title: "Update Calendar",
    description: "Add important dates and appointments to the calendar.",
  },
  {
    title: "Order Office Supplies",
    description: "Purchase necessary supplies like pens, paper, and folders.",
  },
  {
    title: "Plan Weekend Activities",
    description: "Organize activities or outings for the weekend.",
  },
  {
    title: "Clean Windows",
    description: "Wash windows inside and out for a clearer view.",
  },
  {
    title: "Try Yoga Routine",
    description: "Follow a 30-minute beginner yoga routine.",
  },
  {
    title: "Organize Digital Files",
    description: "Sort files and folders on your computer.",
  },
  {
    title: "Call Service Provider",
    description: "Resolve a billing or service issue with a provider.",
  },
  {
    title: "Read Industry Articles",
    description: "Catch up on recent developments in your field.",
  },
  {
    title: "Prepare Weekly Review",
    description:
      "Summarize weekly achievements and set goals for the next week.",
  },
].map((task) => {
  let random = (number) => Math.floor(Math.random() * number);
  let changeOfBeingTrue = (likely = 0.5) => Math.random() < likely
  let isNegative = (number) => {
    if (Math.floor(Math.random)) {
      return -number;
    } else {
      return number;
    }
  };

  let extraDays = random(30);

  let extraHours = random(12);

  let completed = false;
  
  let status;
  
  const days = isNegative(extraDays);
  
  //if in the past, 75% should be complete
  if (days < 0) {
    if(changeOfBeingTrue(0.75)){
      status = 'completed'
    } else {
      status = ["pending", "in_progress", "completed"][
        Math.floor(Math.random() * 3)
      ];
    }
  } else {
    status = "pending";
  }

  if (status === "completed") {
    completed = true;
  }

  return {
    ...task,
    id: uuid(),
    status,
    completed,
    due_date: moment()
      .startOf("day")
      .add(days, "days")
      .add(isNegative(extraHours), "hours"),
  };
});
export default tasks;
