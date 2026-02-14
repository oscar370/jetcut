"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/generated/prisma/client";
import Link from "next/link";

type UserDetailsProps = {
  user: User;
};

export function UserDetails({ user }: UserDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User details</CardTitle>
        <CardAction>
          <Button asChild variant="link">
            <Link href="/user/edit">Edit name</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2">
        <div>
          <span className="font-bold">User name</span>
          <br />
          <span> {user.name} </span>
        </div>
        <div>
          <span className="font-bold">Email</span>
          <br />
          <span> {user.email} </span>
        </div>
      </CardContent>
    </Card>
  );
}
