// components/BalanceChart.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Transaction {
    time: Date;
    amount: number;
}

interface BalanceChartProps {
    transactions: Transaction[];
}

const BalanceChart: React.FC<BalanceChartProps> = ({ transactions }) => {
    // Sort transactions by time
    const sortedTransactions = transactions.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    // Prepare data for the chart
    const labels = sortedTransactions.map(transaction => new Date(transaction.time).toLocaleDateString());
    const dataPoints = sortedTransactions.map(transaction => transaction.amount / 100); // assuming amount is in cents

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Account Balance Over Time",
                data: dataPoints,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Account Balance Over Time',
            },
        },
        scales: {
            x: {
                type: 'category' as const,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default BalanceChart;

