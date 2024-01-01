import Image from 'next/image';

export default function page() {
  return (
    <main className="h-screen w-full flex justify-center  bg-sky-700">
      <div className="w-full m-10 mt-10 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="flex justify-center items-center mb-3">
            <Image src="/SAPlogo.png" alt="SAP Logo" width={62} height={62} />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2 text-black">
            SAP Kick Off 2024 · 24th January
          </h1>
          <div className="mt-6">
            <Image
              src="/sapsampleimg1.png"
              alt="Sample image"
              width={662}
              height={662}
            />
          </div>
        </div>
        <div className="flex w-full items-center space-x-2 mb-6"></div>
      </div>
    </main>
  );
}
