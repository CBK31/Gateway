import { Request, Response } from "express";

declare global {
  namespace Express {
    export interface Request {
      userInfo?: any;
      // userInfo?: {
      //   id?: any;
      // };
    }
    export interface Response {
      userInfo?: any;
      // userInfo?: {
      //   id?: any;
      // };
    }
  }
}

// declare global {
//   namespace Express {
//     export interface Request {
//       userInfo?: any;
//       data?: any;
//     }
//     export interface Response {
//       userInfo?: any;
//       data?: any;
//     }
//   }
// }
