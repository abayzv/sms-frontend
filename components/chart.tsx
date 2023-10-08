import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MyChart({ type = "line" }: { type?: any }) {
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    }

    const series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
            name: "series-1",
            data: [10, 60, 20, 30, 60, 30, 40, 71]
        }
    ]

    return <ApexCharts options={options} series={series} type={type} />
}