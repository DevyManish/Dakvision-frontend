"use client";
import React from "react";
import { cn } from "@/lib/utils"

const Footer = () => {
  const [serverStatus, setServerStatus] = React.useState('unknown')

  const checkServerStatus = React.useCallback(async () => {
    try {
      const response = await fetch('https://dakvision-backend.onrender.com/api/v1/healthcheck')
      const data = await response.json()
      setServerStatus(data.data.serverStatus === 'online' ? 'online' : 'offline')
    } catch (error) {
      setServerStatus('offline')
    }
  }, [])

  React.useEffect(() => {
    checkServerStatus()
    const interval = setInterval(checkServerStatus, 5 * 60 * 1000) // Check every 5 minutes
    return () => clearInterval(interval)
  }, [checkServerStatus])

  return (
    <footer className="body-font bottom-0">
      <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center ">
          <span className="ml-3 text-xl">DakSeva</span>
        </a>
        <p className="text-sm  sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} DakSeva —
          <a
            href="https://twitter.com/l_m_manish"
            className=" ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Debuggers
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <div className="flex items-center gap-2 px-4">
            <div 
              className={cn(
                "w-2 h-2 rounded-full",
                serverStatus === 'online' ? "bg-green-500" : 
                serverStatus === 'offline' ? "bg-red-500" : 
                "bg-gray-500"
              )}
            />
            <span className="text-sm">
              Server: {serverStatus === 'online' ? 'Online' : serverStatus === 'offline' ? 'Offline' : 'Checking...'}
            </span>
          </div>
          <a className="">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a className="ml-3 ">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a className="ml-3 ">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>
          <a className="ml-3 ">
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <circle cx={4} cy={4} r={2} stroke="none" />
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
