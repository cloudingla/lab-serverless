import React, { ReactNode } from "react"
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports"

interface props {
  children: ReactNode
}
export const AmplifyClient = ({ children }: props) => {
  Amplify.configure(awsmobile)

  return (
    <div>
      {children}
    </div>
  )
}