"use client";

import { use } from "react";

interface TestData {
  message: string;
}

// Simple async data fetch to test React 19 features
async function getData(): Promise<TestData> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ message: "React 19 async features working!" }),
      100
    );
  });
}

const promise = getData();

export function TestFeatures() {
  const data = use<TestData>(promise);
  console.log("✨ React 19:", data.message);
  return null;
}
