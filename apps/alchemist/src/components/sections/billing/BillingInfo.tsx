"use client"

// Billing Info Card
import * as React from "react"
import { buttonVariants } from "@/components/ui/common/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card"
import { cn, formatDate } from "@/lib/utils"
import Link from "next/link"
import { UserSubscriptionPlan } from "@/types/index"

type BillingInfoContent = {
  title: string
  description: string
  buttonTextPaid: string
  buttonTextFree: string
  canceledText: string
  renewsText: string
}

const content: BillingInfoContent = {
  title: "Subscription Plan",
  description: "You are currently on the <strong>{subscriptionPlan.title}</strong> plan.",
  buttonTextPaid: "Manage Subscription",
  buttonTextFree: "Upgrade now",
  canceledText: "Your plan will be canceled on ",
  renewsText: "Your plan renews on ",
}

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan;
}

export function BillingInfo({ subscriptionPlan }: BillingInfoProps) {
  const cardStyle = "max-w-2xl mx-auto";

  return (
    <Card className={cardStyle}>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription
          dangerouslySetInnerHTML={{
            __html: content.description.replace("{subscriptionPlan.title}", subscriptionPlan.title),
          }}
        />
      </CardHeader>
      <CardContent>{subscriptionPlan.description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        <Link href="/pricing" className={cn(buttonVariants())}>
          {subscriptionPlan.isPaid ? content.buttonTextPaid : content.buttonTextFree}
        </Link>
        {subscriptionPlan.isPaid ? (
          <p className="rounded-full text-xs font-medium">
            {subscriptionPlan.isCanceled ? content.canceledText : content.renewsText}
            {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
          </p>
        ) : null}
      </CardFooter>
    </Card>
  )
}