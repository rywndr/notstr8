import { AreaChartInteractive } from "@/components/dashboard/AreaChartInteractive"
import { PieCh } from "@/components/dashboard/PieChart"
import { getCommunityMembers } from "@/actions"

const Dashboard = async () => {
  const { members } = await getCommunityMembers(1, 1000)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center p-4">  
            <h1 className="text-4xl font-bold">Dashboard Analitik</h1>
            <p className="text-slate-600 mt-2">Statistik dan wawasan anggota komunitas</p>
        </div> 
        <div className="p-2 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <PieCh 
                    members={members}
                    title="Distribusi Jenis Kelamin"
                    description="Distribusi anggota berdasarkan jenis kelamin"
                    dataKey="gender"
                />
                <PieCh 
                    members={members}
                    title="Status Kepemilikan BPJS"
                    description="Distribusi anggota berdasarkan kepemilikan BPJS"
                    dataKey="hasBpjs"
                />
                <PieCh 
                    members={members}
                    title="Status Perkawinan"
                    description="Distribusi anggota berdasarkan status perkawinan"
                    dataKey="maritalStatus"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <AreaChartInteractive 
                    members={members}
                    title="Distribusi Usia"
                    description="Distribusi anggota komunitas berdasarkan usia"
                    dataKey="age"
                    label="Anggota"
                    color="hsl(var(--chart-1))"
                />
                <AreaChartInteractive 
                    members={members}
                    title="Distribusi Tingkat Pendidikan"
                    description="Distribusi anggota komunitas berdasarkan tingkat pendidikan"
                    dataKey="lastEducation"
                    label="Anggota"
                    color="hsl(var(--chart-2))"
                />
            </div>
            <div className="w-full">
                <AreaChartInteractive 
                    members={members}
                    title="Distribusi Status Pekerjaan"
                    description="Distribusi anggota komunitas berdasarkan status pekerjaan"
                    dataKey="employmentStatus"
                    label="Anggota"
                    color="hsl(var(--chart-3))"
                />
            </div>
        </div>
    </div>
  )
}

export default Dashboard