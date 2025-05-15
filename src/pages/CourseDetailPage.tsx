
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp",
  description: "Learn HTML, CSS, JavaScript, React, Node.js and more with practical projects.",
  price: 49.99,
  imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=800",
  instructor: "John Doe",
  duration: "35 hours",
  level: "Beginner to Advanced",
  isPurchased: false,
  chapters: [
    {
      id: "ch1",
      title: "Introduction to Web Development",
      description: "Overview of the course and web development basics.",
      duration: "15:30",
      videoUrl: "#",
    },
    {
      id: "ch2",
      title: "HTML Fundamentals",
      description: "Learn the core HTML elements and structure.",
      duration: "42:15",
      videoUrl: "#",
    },
    {
      id: "ch3",
      title: "CSS Styling Basics",
      description: "Learn to style your HTML with CSS.",
      duration: "38:45",
      videoUrl: "#",
    },
    {
      id: "ch4",
      title: "JavaScript Essentials",
      description: "Core JavaScript concepts and DOM manipulation.",
      duration: "1:12:30",
      videoUrl: "#",
    },
    {
      id: "ch5",
      title: "Building Your First Website",
      description: "Apply your knowledge to build a complete website.",
      duration: "58:20",
      videoUrl: "#",
    },
  ],
};

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [affiliateLink, setAffiliateLink] = useState("");
  const [showCopied, setShowCopied] = useState(false);

  // In a real app, we would fetch the course data based on the ID
  const course = courseData;

  const createAffiliateLink = () => {
    const link = `https://learnhub.com/course/${id}?ref=affiliate123`;
    setAffiliateLink(link);
    toast.success("Affiliate link generated successfully!");
  };

  const copyAffiliateLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link to="/courses" className="text-brand-primary hover:underline flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Courses
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Details */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-700 mb-6">{course.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500 block mb-1">Instructor</span>
              <span className="font-medium">{course.instructor}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500 block mb-1">Duration</span>
              <span className="font-medium">{course.duration}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500 block mb-1">Level</span>
              <span className="font-medium">{course.level}</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Course Content</h2>
          <div className="space-y-3">
            {course.chapters.map((chapter, index) => (
              <Card key={chapter.id}>
                <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex flex-grow mb-2 md:mb-0">
                    <div className="mr-4 bg-brand-light text-brand-primary rounded-full h-8 w-8 flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{chapter.title}</h3>
                      <p className="text-sm text-gray-500">{chapter.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-auto">
                    <span className="text-sm text-gray-500 mr-4">{chapter.duration}</span>
                    <Button 
                      variant={course.isPurchased ? "default" : "outline"} 
                      size="sm" 
                      disabled={!course.isPurchased}
                    >
                      {course.isPurchased ? "Watch" : "Preview"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Purchase Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-3xl font-bold text-brand-primary">${course.price.toFixed(2)}</span>
              </div>
              
              {course.isPurchased ? (
                <Button className="w-full mb-4">
                  Continue Learning
                </Button>
              ) : (
                <Button className="w-full mb-4">
                  Buy this Course
                </Button>
              )}
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Create Affiliate Link
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate Affiliate Link</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-gray-500">
                      Share this course with your audience and earn 30% commission on each sale.
                    </p>
                    {affiliateLink ? (
                      <div className="flex items-center space-x-2">
                        <Input value={affiliateLink} readOnly />
                        <Button size="sm" onClick={copyAffiliateLink}>
                          {showCopied ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={createAffiliateLink}>
                        Generate Link
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold mb-2">This course includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{course.duration} of on-demand video</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Access on mobile and TV</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Lifetime access</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
