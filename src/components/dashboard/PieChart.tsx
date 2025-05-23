"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import type { CommunityMember } from "../../../prisma/app/generated/prisma"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface PieChartData {
  category: string
  visitors: number
  fill: string
}

interface PieChProps {
  members: CommunityMember[]
  title?: string
  description?: string
  dataKey?: keyof CommunityMember
}

// Helper function to process gender data
const processGenderData = (members: CommunityMember[]): PieChartData[] => {
  const genderCounts: { [gender: string]: number } = {}

  members.forEach((member) => {
    if (member.gender) {
      const gender = member.gender
      genderCounts[gender] = (genderCounts[gender] || 0) + 1
    }
  })

  return Object.entries(genderCounts).map(([gender, count]) => ({
    category:
      gender === "PRIA"
        ? "Pria"
        : gender === "WANITA"
        ? "Wanita"
        : gender,
    visitors: count,
    fill:
      gender === "PRIA"
        ? "hsl(var(--chart-1))"
        : "hsl(var(--chart-2))",
  }))
}

// Helper function to process BPJS data
const processBpjsData = (members: CommunityMember[]): PieChartData[] => {
  const bpjsCounts = { memiliki: 0, tidakMemiliki: 0 }

  members.forEach((member) => {
    if (member.hasBpjs) {
      bpjsCounts.memiliki++
    } else {
      bpjsCounts.tidakMemiliki++
    }
  })

  return [
    {
      category: "Memiliki",
      visitors: bpjsCounts.memiliki,
      fill: "hsl(var(--chart-1))",
    },
    {
      category: "Tidak Memiliki",
      visitors: bpjsCounts.tidakMemiliki,
      fill: "hsl(var(--chart-2))",
    },
  ]
}

// Helper function to process marital status data
const processMaritalStatusData = (members: CommunityMember[]): PieChartData[] => {
  const maritalCounts: { [status: string]: number } = {}

  members.forEach((member) => {
    if (member.maritalStatus) {
      const status = member.maritalStatus
      maritalCounts[status] = (maritalCounts[status] || 0) + 1
    }
  })

  const maritalLabels: { [key: string]: string } = {
    BELUM_KAWIN: "Belum Kawin",
    KAWIN: "Kawin",
    CERAI: "Cerai",
  }

  const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

  return Object.entries(maritalCounts).map(([status, count], index) => ({
    category: maritalLabels[status] || status,
    visitors: count,
    fill: colors[index % colors.length],
  }))
}

export function PieCh({
  members,
  title = "Grafik Lingkaran",
  description = "Distribusi data anggota komunitas",
  dataKey = "gender",
}: PieChProps) {
  const [chartData, setChartData] = React.useState<PieChartData[]>([])
  const [chartConfig, setChartConfig] = React.useState<ChartConfig>({})

  React.useEffect(() => {
    let processedData: PieChartData[] = []
    let config: ChartConfig = { visitors: { label: "Anggota" } }

    switch (dataKey) {
      case "gender":
        processedData = processGenderData(members)
        config = {
          visitors: { label: "Anggota" },
          pria: { label: "Pria", color: "hsl(var(--chart-1))" },
          wanita: { label: "Wanita", color: "hsl(var(--chart-2))" },
        }
        break
      case "hasBpjs":
        processedData = processBpjsData(members)
        config = {
          visitors: { label: "Anggota" },
          memiliki: { label: "Memiliki BPJS", color: "hsl(var(--chart-1))" },
          "tidak-memiliki": {
            label: "Tidak Memiliki BPJS",
            color: "hsl(var(--chart-2))",
          },
        }
        break
      case "maritalStatus":
        processedData = processMaritalStatusData(members)
        config = {
          visitors: { label: "Anggota" },
          "belum-kawin": { label: "Belum Kawin", color: "hsl(var(--chart-1))" },
          kawin: { label: "Kawin", color: "hsl(var(--chart-2))" },
          cerai: { label: "Cerai", color: "hsl(var(--chart-3))" },
        }
        break
      default:
        processedData = processGenderData(members)
        config = {
          visitors: { label: "Anggota" },
          pria: { label: "Pria", color: "hsl(var(--chart-1))" },
          wanita: { label: "Wanita", color: "hsl(var(--chart-2))" },
        }
    }

    setChartData(processedData)
    setChartConfig(config)
  }, [members, dataKey])

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Anggota
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Data terkini anggota komunitas <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan distribusi data anggota komunitas
        </div>
      </CardFooter>
    </Card>
  )
}
