"use client";

import Background from "@/components/colorPicker/Background";
import Color from "@/components/colorPicker/Color";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Color />
        <Background />
      </div>
    </main>
  );
}
