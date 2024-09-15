"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

// creating server action allowing us to fetch sessions for both normal users and client
//creating user server action
export async function createSessionClient() {
  const client = new Client() // creating new client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)  // setting appwrite endpoint and projectid
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session"); // getting session if exists

  if (!session || !session.value) {
    throw new Error("No session");  // if no session exists throw error
  }

  client.setSession(session.value);  // we attach session to client

  // we can use get account to get the session
  return {
    get account() {
      return new Account(client);
    },
  };
}

//creating admin server action with the help of appwrite key
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    // creating function to get database from appwrite
    get database(){
        return new Databases(client);  
    },
    // creating function to get users from appwrite
    get user(){
        return new Users(client);  
    }
  };
}
