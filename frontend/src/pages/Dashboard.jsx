import { useState, useEffect } from 'react';
import { NeuCard } from '../components/NeuCard';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../api/axios';
import { Activity, CheckCircle, Clock } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data || []);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const inProgressTasks = totalTasks - completedTasks;

  const chartData = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        backgroundColor: ['#4A90E2', '#7AB0F3'],
        data: [completedTasks, inProgressTasks],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#1F2937' }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NeuCard padding="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #7AB0F3 100%)' }}>
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Total Tasks</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{totalTasks}</p>
            </div>
          </div>
        </NeuCard>

        <NeuCard padding="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #7AB0F3 100%)' }}>
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Completed</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{completedTasks}</p>
            </div>
          </div>
        </NeuCard>

        <NeuCard padding="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #7AB0F3 100%)' }}>
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#6B7280' }}>In Progress</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{inProgressTasks}</p>
            </div>
          </div>
        </NeuCard>
      </div>

      <NeuCard padding="p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Task Status</h2>
        <div className="h-64 flex justify-center">
          {totalTasks > 0 ? (
            <Pie data={chartData} options={chartOptions} />
          ) : (
            <p className="flex items-center justify-center h-full" style={{ color: '#6B7280' }}>No data available</p>
          )}
        </div>
      </NeuCard>
    </div>
  );
}
