import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, Users, Award, BookOpen, Video, Download } from 'lucide-react';

interface CourseModule {
  title: string;
  duration: string;
  lessons: number;
}

const courseModules: CourseModule[] = [
  {
    title: "Introduction to Digital Marketing",
    duration: "2 hours",
    lessons: 5
  },
  {
    title: "Content Marketing Fundamentals",
    duration: "3 hours",
    lessons: 7
  },
  {
    title: "Social Media Strategy",
    duration: "4 hours",
    lessons: 8
  },
  {
    title: "Email Marketing Mastery",
    duration: "3 hours",
    lessons: 6
  }
];

export default function CourseLandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Video */}
      <section className="relative h-[70vh] bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
        <video
          className="w-full h-full object-cover"
          poster="/course-thumbnail.jpg"
          controls={isVideoPlaying}
          onClick={() => setIsVideoPlaying(true)}
        >
          <source src="/course-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!isVideoPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full p-6"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Video className="w-8 h-8" />
            </Button>
          </div>
        )}
      </section>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">Digital Marketing</Badge>
                <Badge variant="outline">4.8 ★ (2,345 reviews)</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Complete Digital Marketing Masterclass 2024</h1>
              <p className="text-xl text-muted-foreground">
                Master digital marketing from scratch. Learn SEO, social media, content marketing, and more.
              </p>
            </div>

            {/* Course Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>24 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>26 Lessons</span>
              </div>
            </div>

            {/* Course Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <h3 className="text-2xl font-semibold">What you'll learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Master digital marketing fundamentals",
                    "Create effective social media strategies",
                    "Optimize content for search engines",
                    "Build and manage email campaigns",
                    "Analyze and improve marketing performance",
                    "Develop a comprehensive marketing plan"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="curriculum" className="space-y-4">
                <h3 className="text-2xl font-semibold">Course Modules</h3>
                <div className="space-y-4">
                  {courseModules.map((module, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{module.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {module.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {module.lessons} lessons
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Preview
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="instructor" className="space-y-4">
                <div className="flex items-start gap-6">
                  <img
                    src="/instructor.jpg"
                    alt="Instructor"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">John Doe</h3>
                    <p className="text-muted-foreground">Digital Marketing Expert</p>
                    <p>
                      With over 10 years of experience in digital marketing, John has helped
                      hundreds of businesses grow their online presence and achieve their
                      marketing goals.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 space-y-6 sticky top-6">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground line-through">$199</span>
                </div>
                <p className="text-sm text-muted-foreground">Limited time offer</p>
              </div>

              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Add to Cart
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">This course includes:</h4>
                <div className="space-y-2">
                  {[
                    "24 hours on-demand video",
                    "26 downloadable resources",
                    "Full lifetime access",
                    "Certificate of completion",
                    "30-day money-back guarantee"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="link" className="w-full" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Course Syllabus
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 