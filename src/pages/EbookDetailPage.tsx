
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock data
const ebookData = {
  id: "1",
  title: "React Patterns & Best Practices",
  description: "Practical guide to writing maintainable React applications with modern patterns, hooks, and state management.",
  price: 19.99,
  coverUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&w=800",
  author: "Jane Smith",
  pages: 245,
  level: "Intermediate to Advanced",
  isPurchased: false,
  previewPages: 15,
};

const EbookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [affiliateLink, setAffiliateLink] = useState("");
  const [showCopied, setShowCopied] = useState(false);

  // In a real app, we would fetch the ebook data based on the ID
  const ebook = ebookData;

  const createAffiliateLink = () => {
    const link = `https://learnhub.com/ebook/${id}?ref=affiliate123`;
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
        <Link to="/ebooks" className="text-brand-primary hover:underline flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to eBooks
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* eBook Details */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50 aspect-[3/4] flex items-center justify-center">
                <img 
                  src={ebook.coverUrl} 
                  alt={ebook.title} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-4">{ebook.title}</h1>
              <p className="text-gray-700 mb-6">{ebook.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500 block mb-1">Author</span>
                  <span className="font-medium">{ebook.author}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500 block mb-1">Pages</span>
                  <span className="font-medium">{ebook.pages}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500 block mb-1">Level</span>
                  <span className="font-medium">{ebook.level}</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">About this eBook</h2>
                <p className="text-gray-700 mb-3">
                  This comprehensive guide covers the most important React patterns and best practices used in modern application development. From component composition to state management solutions, you'll learn how to write clean, maintainable, and efficient React code.
                </p>
                <p className="text-gray-700 mb-3">
                  Whether you're building complex enterprise applications or simple websites, the techniques in this book will help you become a more proficient React developer and create better user experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center">
              <div className="w-full max-w-md h-96 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
                <div className="bg-gray-100 border-b border-gray-200 p-4 text-center">
                  <h3 className="font-medium">Sample Preview</h3>
                </div>
                <div className="p-6 flex-grow overflow-hidden flex flex-col items-center justify-center text-center">
                  <p className="text-gray-400 mb-4">Preview available for first {ebook.previewPages} pages</p>
                  {ebook.isPurchased ? (
                    <Button>Open eBook</Button>
                  ) : (
                    <Button variant="outline">Preview Sample</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-3xl font-bold text-brand-primary">${ebook.price.toFixed(2)}</span>
              </div>
              
              {ebook.isPurchased ? (
                <Button className="w-full mb-4">
                  Read eBook
                </Button>
              ) : (
                <Button className="w-full mb-4">
                  Buy this eBook
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
                      Share this eBook with your audience and earn 30% commission on each sale.
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
                <h3 className="font-semibold mb-2">This eBook includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>PDF format ({ebook.pages} pages)</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Read online anywhere</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Code examples included</span>
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

export default EbookDetailPage;
