"use client";

import { useNotes } from "@/context/notes-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function StatsCard() {
  const { notes, categories } = useNotes();

  const categoryData = categories.map((category) => ({
    name: category,
    count: notes.filter((note) => note.category === category).length,
  }));

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
      title: "Pinned",
      value: notes.filter((note) => note.isPinned).length,
    },
    {
      title: "Archived",
      value: notes.filter((note) => note.isArchived).length,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes Overview</CardTitle>
        <CardDescription>A summary of your notes and categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        <div className="mt-4 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <XAxis 
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
                tickMargin={5}
              />
              <YAxis
                width={40}
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  padding: '8px'
                }}
                labelStyle={{
                  color: 'hsl(var(--foreground))',
                  marginBottom: '4px'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}