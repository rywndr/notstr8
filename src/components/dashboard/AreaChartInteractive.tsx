"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { getCommunityMembers } from "@/actions" // Import server action
import type { CommunityMember } from "../../../prisma/app/generated/prisma" // Import type
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart"

const chartConfig = {
  count: {
    label: "Members",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// Helper function to process fetched data
const processAgeData = (members: CommunityMember[]) => {
  const ageCounts: { [age: number]: number } = {}
  members.forEach((member) => {
    if (member.age !== null && member.age !== undefined) {
      ageCounts[member.age] = (ageCounts[member.age] || 0) + 1
    }
  })
  return Object.entries(ageCounts)
    .map(([age, count]) => ({ age: parseInt(age, 10), count }))
    .sort((a, b) => a.age - b.age) // Sort by age for the chart
}

export function AreaChartInteractive() {
  const [ageDistributionData, setAgeDistributionData] = React.useState<
    { age: number; count: number }[]
  >([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const members = await getCommunityMembers()
        const processedData = processAgeData(members)
        setAgeDistributionData(processedData)
      } catch (error) {
        console.error("Failed to fetch or process community member data:", error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
          <CardDescription>Loading data...</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center">
          <p>Loading chart data...</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate total members
  const totalMembers = ageDistributionData.reduce(
    (sum, item) => sum + item.count,
    0
  );

  // Create dynamic chartConfig for legend
  const currentChartConfig = {
    ...chartConfig,
    count: {
      ...chartConfig.count,
      label: `Members: ${totalMembers}`, // Update label to include total count
    },
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b sm:flex-row">
        <div className="grid flex-1 text-center sm:text-left">
          <CardTitle>Age Distribution of Community Members</CardTitle>
          <CardDescription>
            Showing the number of community members by age.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={currentChartConfig} // Use the updated chart config
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={ageDistributionData}>
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="age" // X-axis represents age
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={16}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const age = label; // X-axis value (age)
                  const countData = payload.find(p => p.dataKey === 'count');
                  if (countData) {
                    const countValue = countData.value;
                    const color = countData.color || chartConfig.count.color;
                    return (
                      <div className="rounded-lg border bg-background p-2 text-sm shadow-sm">
                        <div className="grid gap-1.5">
                          <div className="font-medium text-foreground">Age: {age}</div>
                          <div className="flex items-center text-muted-foreground">
                            <span
                              className="mr-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-[2px]"
                              style={{ backgroundColor: color }}
                            />
                            {countValue} Member(s)
                          </div>
                        </div>
                      </div>
                    );
                  }
                }
                return null;
              }}
            />
            <Area
              dataKey="count" // Data key for the number of members
              type="natural"
              fill="url(#fillCount)"
              stroke="var(--color-count)"
              stackId="a" // stackId can be kept or removed if only one Area
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}