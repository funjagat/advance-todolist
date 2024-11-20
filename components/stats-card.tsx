"use client";

import { useNotes } from "@/context/notes-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState } from "react";
import { Button } from "./ui/button";
import { BarChart2, PieChart as PieChartIcon } from "lucide-react";

const CustomXAxis = ({ angle = -45, height = 60, fontSize = 12, tickMargin = 5, ...props }) => (
  <XAxis
    angle={angle}
    height={height}
    fontSize={fontSize}
    tickMargin={tickMargin}
    tick={{ fill: "hsl(var(--foreground))" }}
    {...props}
  />
);

const CustomYAxis = ({ width = 40, fontSize = 12, ...props }) => (
  <YAxis
    width={width}
    fontSize={fontSize}
    tick={{ fill: "hsl(var(--foreground))" }}
    {...props}
  />
);

const CustomTooltip = ({ active, payload, label, ...props }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="bg-background border border-border rounded-lg p-2"
      style={{
        backgroundColor: "hsl(var(--background))",
        border: "1px solid hsl(var(--border))",
      }}
    >
      <p className="text-foreground mb-1">{label}</p>
      <p className="text-foreground font-semibold">
        Count: {payload[0].value}
      </p>
    </div>
  );
};

export function StatsCard() {
  const { notes, categories, tags } = useNotes();
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  const categoryData = categories.map((category) => ({
    name: category,
    count: notes.filter((note) => note.category === category).length,
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const stats = [
    {
      title: "Total Notes",
      value: notes.length,
    },
    {
      title: "Categories",
      value: categories.length,
    },
    {
      title: "Tags",
      value: tags.length,
    },
    {
      title: "Pinned",
      value: notes.filter((note) => note.isPinned).length,
    },
    {
      title: "Archived",
      value: notes.filter((note) => note.isArchived).length,
    },
    {
      title: "Favorites",
      value: notes.filter((note) => note.isFavorite).length,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Notes Overview</CardTitle>
            <CardDescription>A summary of your notes and categories</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Bar
            </Button>
            <Button
              variant={chartType === "pie" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("pie")}
            >
              <PieChartIcon className="h-4 w-4 mr-2" />
              Pie
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={categoryData}>
                <CustomXAxis dataKey="name" />
                <CustomYAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}