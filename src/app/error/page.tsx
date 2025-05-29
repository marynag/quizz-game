"use client";
import { ErrorScreen } from "@/components/error/ErrorScreen";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams.get("message") || "An unexpected error occurred";

  return <ErrorScreen error={errorMessage} />;
}
