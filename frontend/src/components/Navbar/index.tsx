import { AmplifySignOut } from "@aws-amplify/ui-react";
import React from "react";

export const Navbar = () => {
  return (
        <div className="bg-primaryBg">
          <div className="max-w-7xl mx-auto px-2 sm:px-6">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center items-stretch justify-between">
                <div className="flex-shrink-0 flex items-center">
                </div>
                <div className="block ml-6">
                  <div className="flex space-x-2">
                    <button
                      className="bg-alternateText text-secondaryText hover:text-primaryText block px-3 py-2 rounded-md text-base font-medium"
                    >
                      <AmplifySignOut />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};