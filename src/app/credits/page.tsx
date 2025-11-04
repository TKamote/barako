"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

export default function CreditsPage() {
  const attributions = [
    {
      icon: "Ball One",
      url: "https://www.flaticon.com/free-icons/ball-one",
      title: "ball one icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-1.png",
    },
    {
      icon: "Ball Two",
      url: "https://www.flaticon.com/free-icons/ball-two",
      title: "ball two icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-2.png",
    },
    {
      icon: "Ball Three",
      url: "https://www.flaticon.com/free-icons/ball-three",
      title: "ball three icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-3.png",
    },
    {
      icon: "Ball Four",
      url: "https://www.flaticon.com/free-icons/ball-four",
      title: "ball four icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-4.png",
    },
    {
      icon: "Ball Five",
      url: "https://www.flaticon.com/free-icons/ball-five",
      title: "ball five icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-5.png",
    },
    {
      icon: "Ball Six",
      url: "https://www.flaticon.com/free-icons/ball-six",
      title: "ball six icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-6.png",
    },
    {
      icon: "Ball Seven",
      url: "https://www.flaticon.com/free-icons/ball-seven",
      title: "ball seven icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-7.png",
    },
    {
      icon: "Ball Eight",
      url: "https://www.flaticon.com/free-icons/ball-eight",
      title: "ball eight icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-8.png",
    },
    {
      icon: "Ball Nine",
      url: "https://www.flaticon.com/free-icons/ball-nine",
      title: "ball nine icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-9.png",
    },
    {
      icon: "Ball Ten",
      url: "https://www.flaticon.com/free-icons/ball-ten",
      title: "ball ten icons",
      author: "Boris farias",
      authorUrl: "https://www.flaticon.com/authors/boris-farias",
      image: "/ballicons/ball-10.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[21px] font-bold text-gray-900 mb-2">Credits & Attributions</h1>
        <p className="text-sm text-gray-600 mb-8">
          Icons used throughout this application from Flaticon
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {attributions.map((attr, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
                  <Image
                    src={attr.image}
                    alt={attr.icon}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {attr.icon}
                </h3>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <a
                    href={attr.url}
                    title={attr.title}
                    target="_blank"
                    rel="nofollow"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {attr.icon} icons
                  </a>{" "}
                  created by{" "}
                  <a
                    href={attr.authorUrl}
                    target="_blank"
                    rel="nofollow"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {attr.author}
                  </a>{" "}
                  -{" "}
                  <a
                    href="https://www.flaticon.com"
                    target="_blank"
                    rel="nofollow"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Flaticon
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> All icons used in this application are from{" "}
            <a
              href="https://www.flaticon.com"
              target="_blank"
              rel="nofollow"
              className="text-blue-600 hover:text-blue-800 underline font-semibold"
            >
              Flaticon
            </a>{" "}
            and are used in accordance with their attribution requirements. This page serves as a placeholder for ball icons that will be implemented on the live-match page.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

