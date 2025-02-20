'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@/components/ui/use-toast';

const mockData = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 3 },
  { name: 'Wed', tasks: 2 },
  { name: 'Thu', tasks: 6 },
  { name: 'Fri', tasks: 8 },
  { name: 'Sat', tasks: 3 },
  { name: 'Sun', tasks: 2 },
];

export default function Dashboard() {
  const { toast } = useToast();
  const [aiSuggestion, setAiSuggestion] = useState('');

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Here you would typically process the file and extract tasks
      toast({
        title: 'File uploaded',
        description: 'Processing your task list...',
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
        '.docx',
      ],
    },
  });

  useEffect(() => {
    // Simulating AI suggestion
    setAiSuggestion(
      'Based on your task patterns, consider breaking down large tasks into smaller, manageable chunks and tackling complex tasks during your peak productivity hours in the morning.'
    );
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import Tasks
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold">28</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold">16</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">In Progress</h3>
          <p className="text-3xl font-bold">12</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Weekly Activity</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">AI Suggestions</h3>
          <p className="text-muted-foreground">{aiSuggestion}</p>
        </Card>
      </div>

      <Card
        {...getRootProps()}
        className={`p-6 border-dashed cursor-pointer ${
          isDragActive ? 'border-primary' : ''
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2">
            Drag and drop your task list here, or click to select files
          </p>
          <p className="text-sm text-muted-foreground">
            Supports PDF, DOCX, and TXT files
          </p>
        </div>
      </Card>
    </div>
  );
}