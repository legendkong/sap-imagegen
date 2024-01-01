'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import React from 'react';
import {
  DialogTrigger,
  DialogFooter,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePromptChange = (event: any) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // setImages((prevImages) => [...prevImages, data.imageUrl]);
      setImages(data.images);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-center bg-sky-700">
      <div className="w-full m-20 mt-10 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="flex justify-center items-center mb-3">
            <Image src="/SAPlogo.png" alt="SAP Logo" width={62} height={62} />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2 text-black">
            SAP Kick Off 2024 · 24th January
          </h1>
          <p className="text-black">Image generation for live event</p>
        </div>
        <div className="flex w-full items-center space-x-2 mb-6">
          <Input
            className="flex-grow bg-gray-100 p-12 text-slate-500 border-gray rounded"
            placeholder="Enter a prompt"
            type="text"
            value={prompt}
            onChange={handlePromptChange}
          />
          <Button
            className="bg-black text-white rounded p-12 hover:bg-slate-700 hover:scale-105"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              // Loading icon
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="#ffffff"
                    d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"
                  />
                </svg>
                <div className="mr-3"></div>
                Generate
              </>
            )}
          </Button>
        </div>

        <div className="grid sm:grid-cols-4 gap-4 w-full">
          {images.map((base64Image, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  alt={`Generated Image ${index + 1}`}
                  className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                  height="200"
                  src={base64Image}
                  width="200"
                />
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-sky-600 rounded-lg hover:bg-sky-700"
                      variant="outline"
                    >
                      View Image
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[825px] ">
                    <Image
                      alt={`Generated Image ${index + 1}`}
                      className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                      height="1000"
                      width="1000"
                      src={base64Image}
                    />
                    <DialogFooter>
                      <Button
                        className="bg-green-500 text-white rounded p-2 hover:bg-sky-700 "
                        type="button"
                        onClick={() => setShowConfirmModal(true)}
                      >
                        Accept
                      </Button>
                      <Button
                        className="bg-red-500 text-white rounded p-2 hover:bg-slate-700"
                        type="button"
                      >
                        Reject
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {/* {showConfirmModal && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-xl">
                      <p className="text-black">
                        ⚠️ Confirm push to live event slideshow? This action is
                        irreversible.
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button
                          className="bg-green-500 text-white rounded p-2 mr-2 hover:bg-sky-700"
                          // Add  confirm action here
                        >
                          Confirm
                        </Button>
                        <Button
                          className="bg-gray-500 text-white rounded p-2 z-50 hover:bg-slate-700"
                          onClick={() => setShowConfirmModal(false)} // Close modal
                        >
                          Back
                        </Button>
                      </div>
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
